<?php
/**
 * «Код пирамид» — сервер квеста (reg.ru, PHP 7+).
 * Общее состояние игры: игроки, команды, шифры, буквы слова, финал, точки на карте.
 * Хранилище — один JSON-файл под exclusive-flock. Файл начинается с «<?php exit; ?>»,
 * поэтому по HTTP он отдаёт пустоту, даже если nginx минует .htaccess.
 *
 * Слияние состояния команды монотонное (повтор и офлайн-досылка безопасны):
 *   done/opened/hints/word/where/code/box — минимум времени; att — эпоха, затем максимум;
 *   letters — последняя запись по времени. manual — только с сервера (организатор).
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

const GUARD = "<?php exit; ?>\n";
const TEAM_KEYS = ['skarabei', 'lotos', 'glazgora', 'anubis', 'kobra', 'veer'];
const TEAM_NAMES = ['skarabei' => 'Скарабей', 'lotos' => 'Лотос', 'glazgora' => 'Глаз Гора', 'anubis' => 'Анубис', 'kobra' => 'Кобра', 'veer' => 'Веер'];
const SIDS = ['1', '2', '3', '4', '5', '6', '7'];
const FINAL_STEPS = ['word', 'where', 'code', 'box'];
const CAPTAIN_AWAY_MS = 480000;

function out($code, $data) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function now_ms() { return (int) round(microtime(true) * 1000); }

function clean_name($s) {
    $s = trim(preg_replace('/\s+/u', ' ', strip_tags((string) $s)));
    if (function_exists('mb_substr')) return mb_substr($s, 0, 60, 'UTF-8');
    return substr($s, 0, 120);
}

function upper1($l) {
    $l = (string) $l;
    if ($l === '') return '';
    if (!preg_match('/^\p{L}$/u', $l)) return '';
    return function_exists('mb_strtoupper') ? mb_strtoupper($l, 'UTF-8') : strtoupper($l);
}

function fresh_game($keep = null) {
    return [
        'gen' => bin2hex(random_bytes(4)),
        'config' => $keep && isset($keep['config']) ? $keep['config'] : ['teams' => 5, 'hintMin' => 5, 'test' => true, 'pinHash' => null],
        'pts' => $keep && isset($keep['pts']) ? $keep['pts'] : [],
        'players' => [],
        'teams' => [],
        'log' => [],
    ];
}

function empty_team() {
    return ['captain' => null, 'done' => [], 'manual' => [], 'att' => [], 'opened' => [], 'hints' => [], 'letters' => [],
            'word' => null, 'where' => null, 'code' => null, 'box' => null];
}

function team_of(&$g, $key) {
    if (!isset($g['teams'][$key])) $g['teams'][$key] = empty_team();
    return $g['teams'][$key];
}

function add_log(&$g, $team, $msg) {
    $g['log'][] = ['t' => now_ms(), 'team' => $team, 'm' => $msg];
    if (count($g['log']) > 300) $g['log'] = array_slice($g['log'], -300);
}

function min_ts($a, $b) {
    if ($a === null) return $b;
    if ($b === null) return $a;
    return min($a, $b);
}

/** Слить пришедшее от телефона состояние команды в серверное. Возвращает список событий для журнала. */
function merge_team(&$T, $in, $now) {
    $events = [];
    if (!is_array($in)) return $events;
    foreach (['done', 'opened', 'hints'] as $f) {
        if (!isset($in[$f]) || !is_array($in[$f])) continue;
        foreach ($in[$f] as $sid => $ts) {
            $sid = (string) $sid;
            if (!in_array($sid, SIDS, true) || !is_numeric($ts)) continue;
            $ts = min((int) $ts, $now);
            if (!isset($T[$f][$sid])) {
                $T[$f][$sid] = $ts;
                if ($f === 'done') $events[] = 'шифр станции ' . $sid;
            } elseif ($ts < $T[$f][$sid]) {
                $T[$f][$sid] = $ts;
            }
        }
    }
    if (isset($in['att']) && is_array($in['att'])) {
        foreach ($in['att'] as $sid => $a) {
            $sid = (string) $sid;
            if (!in_array($sid, SIDS, true) || !is_array($a)) continue;
            $e = isset($a['e']) ? (int) $a['e'] : 0;
            $n = isset($a['n']) ? max(0, min(3, (int) $a['n'])) : 0;
            $cur = isset($T['att'][$sid]) ? $T['att'][$sid] : ['e' => 0, 'n' => 0];
            if ($e > $cur['e']) $T['att'][$sid] = ['e' => $e, 'n' => $n];
            elseif ($e === $cur['e'] && $n > $cur['n']) $T['att'][$sid] = ['e' => $e, 'n' => $n];
        }
    }
    if (isset($in['letters']) && is_array($in['letters'])) {
        foreach ($in['letters'] as $pos => $x) {
            $pos = (string) $pos;
            if (!in_array($pos, SIDS, true) || !is_array($x) || !isset($x['t'])) continue;
            $t = min((int) $x['t'], $now);
            $l = upper1(isset($x['l']) ? $x['l'] : '');
            if (!isset($T['letters'][$pos]) || $t > $T['letters'][$pos]['t']) $T['letters'][$pos] = ['l' => $l, 't' => $t];
        }
    }
    $labels = ['word' => 'слово разгадано', 'where' => 'нашли блокнот', 'code' => 'код ларца верный', 'box' => 'ларец открыт, финиш'];
    foreach (FINAL_STEPS as $f) {
        if (!isset($in[$f]) || !is_numeric($in[$f])) continue;
        $ts = min((int) $in[$f], $now);
        if ($T[$f] === null) $events[] = $labels[$f];
        $T[$f] = min_ts($T[$f], $ts);
    }
    return $events;
}

function as_map($a) { return empty($a) ? new stdClass() : (object) $a; }

function team_out($T) {
    $o = [];
    foreach (['done', 'manual', 'att', 'opened', 'hints', 'letters'] as $f) $o[$f] = as_map(isset($T[$f]) ? $T[$f] : []);
    foreach (FINAL_STEPS as $f) $o[$f] = $T[$f];
    return $o;
}

function members_of($g, $key, $now) {
    $m = [];
    $cap = isset($g['teams'][$key]) ? $g['teams'][$key]['captain'] : null;
    foreach ($g['players'] as $pid => $p) {
        if ($p['team'] !== $key) continue;
        $m[] = ['name' => $p['name'], 'captain' => $pid === $cap, 'online' => ($now - $p['seen']) < 60000, 'joined' => $p['joined']];
    }
    usort($m, function ($a, $b) { return $a['joined'] - $b['joined']; });
    return array_map(function ($x) { unset($x['joined']); return $x; }, $m);
}

function player_view($g, $pid, $now) {
    $p = $g['players'][$pid];
    $key = $p['team'];
    $T = isset($g['teams'][$key]) ? $g['teams'][$key] : empty_team();
    $cap = $T['captain'];
    $capName = ($cap && isset($g['players'][$cap])) ? $g['players'][$cap]['name'] : null;
    $capAway = !$cap || !isset($g['players'][$cap]) || ($now - $g['players'][$cap]['seen']) > CAPTAIN_AWAY_MS;
    return [
        'ok' => true, 'gen' => $g['gen'], 'now' => $now,
        'me' => ['pid' => $pid, 'name' => $p['name'], 'team' => $key, 'captain' => $cap === $pid],
        'team' => ['key' => $key, 'T' => team_out($T), 'members' => members_of($g, $key, $now), 'captainName' => $capName, 'captainAway' => $capAway && $cap !== $pid],
        'cfg' => ['teams' => $g['config']['teams'], 'hintMin' => $g['config']['hintMin'], 'test' => !empty($g['config']['test'])],
        'pts' => as_map($g['pts']),
    ];
}

function pick_team($g, $count) {
    $keys = array_slice(TEAM_KEYS, 0, max(1, min(6, (int) $count)));
    $n = array_fill_keys($keys, 0);
    foreach ($g['players'] as $p) if (isset($n[$p['team']])) $n[$p['team']]++;
    $min = min($n);
    $cands = array_keys(array_filter($n, function ($v) use ($min) { return $v === $min; }));
    return $cands[random_int(0, count($cands) - 1)];
}

function next_captain($g, $key, $exclude) {
    $best = null;
    foreach ($g['players'] as $pid => $p) {
        if ($p['team'] !== $key || $pid === $exclude) continue;
        if ($best === null || $p['joined'] < $g['players'][$best]['joined']) $best = $pid;
    }
    return $best;
}

function admin_view($g, $now) {
    $teams = [];
    $count = (int) $g['config']['teams'];
    $keys = TEAM_KEYS;
    foreach ($keys as $i => $key) {
        $has = false;
        foreach ($g['players'] as $p) if ($p['team'] === $key) { $has = true; break; }
        if ($i >= $count && !$has) continue;
        $T = isset($g['teams'][$key]) ? $g['teams'][$key] : empty_team();
        $players = [];
        foreach ($g['players'] as $pid => $p) {
            if ($p['team'] !== $key) continue;
            $players[] = ['pid' => $pid, 'name' => $p['name'], 'captain' => $pid === $T['captain'], 'seen' => $p['seen'], 'joined' => $p['joined']];
        }
        usort($players, function ($a, $b) { return $a['joined'] - $b['joined']; });
        $teams[] = ['key' => $key, 'name' => TEAM_NAMES[$key], 'active' => $i < $count, 'T' => team_out($T), 'players' => $players];
    }
    $cfg = $g['config'];
    unset($cfg['pinHash']);
    return ['ok' => true, 'gen' => $g['gen'], 'now' => $now, 'cfg' => $cfg, 'teams' => $teams,
            'pts' => as_map($g['pts']), 'log' => array_reverse(array_slice($g['log'], -80)), 'players' => count($g['players'])];
}

// ---------------------------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['error' => 'POST only']);
$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) out(400, ['error' => 'bad json']);
$a = isset($in['a']) ? (string) $in['a'] : '';

$DIR = __DIR__ . '/data';
$FILE = $DIR . '/game.php';
if (!is_dir($DIR) && !@mkdir($DIR, 0755, true)) out(500, ['error' => 'storage: mkdir']);
if (!is_file($DIR . '/.htaccess')) @file_put_contents($DIR . '/.htaccess', "Require all denied\nDeny from all\n");
if (!is_file($DIR . '/index.html')) @file_put_contents($DIR . '/index.html', '');
$lock = @fopen($DIR . '/game.lock', 'c');
if (!$lock) out(500, ['error' => 'storage: lock']);
flock($lock, LOCK_EX);

$g = null;
if (is_file($FILE)) {
    $raw = file_get_contents($FILE);
    if (strpos($raw, GUARD) === 0) $g = json_decode(substr($raw, strlen(GUARD)), true);
}
if (!is_array($g)) $g = fresh_game();
foreach (['players', 'teams', 'pts', 'log'] as $f) if (!isset($g[$f]) || !is_array($g[$f])) $g[$f] = [];

$now = now_ms();
$dirty = false;
$resp = null;

function save_and_out($g, $dirty, $resp, $lock, $FILE) {
    if ($dirty) {
        $tmp = $FILE . '.tmp';
        $ok = @file_put_contents($tmp, GUARD . json_encode($g, JSON_UNESCAPED_UNICODE)) !== false && @rename($tmp, $FILE);
        if (!$ok) { flock($lock, LOCK_UN); out(500, ['error' => 'storage: write']); }
    }
    flock($lock, LOCK_UN);
    out(200, $resp);
}

// --- игрок ---------------------------------------------------------------

if ($a === 'join') {
    $pid = isset($in['pid']) ? (string) $in['pid'] : '';
    if ($pid !== '' && isset($g['players'][$pid]) && (isset($in['gen']) && $in['gen'] === $g['gen'])) {
        save_and_out($g, false, player_view($g, $pid, $now), $lock, $FILE);
    }
    $name = clean_name(isset($in['name']) ? $in['name'] : '');
    if ($name === '') save_and_out($g, false, ['error' => 'name'], $lock, $FILE);
    $want = isset($in['team']) ? (string) $in['team'] : '';
    $key = in_array($want, TEAM_KEYS, true) ? $want : pick_team($g, $g['config']['teams']);
    $pid = bin2hex(random_bytes(8));
    $g['players'][$pid] = ['name' => $name, 'team' => $key, 'joined' => $now, 'seen' => $now];
    team_of($g, $key);
    if (!$g['teams'][$key]['captain']) $g['teams'][$key]['captain'] = $pid;
    if (isset($in['T'])) merge_team($g['teams'][$key], $in['T'], $now);
    add_log($g, $key, $name . ' в команде' . ($g['teams'][$key]['captain'] === $pid ? ', капитан' : ''));
    save_and_out($g, true, player_view($g, $pid, $now), $lock, $FILE);
}

if ($a === 'sync' || $a === 'claim_captain') {
    $pid = isset($in['pid']) ? (string) $in['pid'] : '';
    if (!isset($in['gen']) || $in['gen'] !== $g['gen'] || !isset($g['players'][$pid])) {
        save_and_out($g, false, ['ok' => false, 'reset' => true, 'gen' => $g['gen']], $lock, $FILE);
    }
    $p = &$g['players'][$pid];
    if ($now - $p['seen'] > 15000) { $p['seen'] = $now; $dirty = true; }
    $key = $p['team'];
    unset($p);
    team_of($g, $key);
    if ($a === 'sync' && isset($in['team']) && $in['team'] === $key && isset($in['T'])) {
        $before = json_encode($g['teams'][$key]);
        $events = merge_team($g['teams'][$key], $in['T'], $now);
        foreach ($events as $ev) add_log($g, $key, $ev);
        if ($before !== json_encode($g['teams'][$key])) $dirty = true;
    }
    if ($a === 'claim_captain') {
        $cap = $g['teams'][$key]['captain'];
        $away = !$cap || !isset($g['players'][$cap]) || ($now - $g['players'][$cap]['seen']) > CAPTAIN_AWAY_MS;
        if ($away && $cap !== $pid) {
            $g['teams'][$key]['captain'] = $pid;
            add_log($g, $key, $g['players'][$pid]['name'] . ' стал капитаном (прежний не на связи)');
            $dirty = true;
        }
    }
    save_and_out($g, $dirty, player_view($g, $pid, $now), $lock, $FILE);
}

// --- организатор ---------------------------------------------------------

if (strpos($a, 'admin') === 0) {
    $pin = isset($in['pin']) ? (string) $in['pin'] : '';
    $hash = isset($g['config']['pinHash']) ? $g['config']['pinHash'] : null;
    if (!$hash) {
        if ($a !== 'admin_login' || strlen($pin) < 4) save_and_out($g, false, ['error' => 'nopin', 'setup' => true], $lock, $FILE);
        $g['config']['pinHash'] = password_hash($pin, PASSWORD_DEFAULT);
        add_log($g, null, 'PIN организатора задан');
        save_and_out($g, true, admin_view($g, $now), $lock, $FILE);
    }
    if (!password_verify($pin, $hash)) { flock($lock, LOCK_UN); sleep(1); out(403, ['error' => 'pin']); }

    $team = isset($in['team']) ? (string) $in['team'] : '';
    $sid = isset($in['sid']) ? (string) $in['sid'] : '';
    $tpid = isset($in['pid']) ? (string) $in['pid'] : '';

    switch ($a) {
        case 'admin_login':
        case 'admin_state':
            break;
        case 'admin_config':
            if (isset($in['teams'])) $g['config']['teams'] = max(2, min(6, (int) $in['teams']));
            if (isset($in['hintMin'])) $g['config']['hintMin'] = max(0, min(60, (int) $in['hintMin']));
            if (isset($in['test'])) $g['config']['test'] = (bool) $in['test'];
            add_log($g, null, 'Настройки: команд ' . $g['config']['teams'] . ', подсказка через ' . $g['config']['hintMin'] . ' мин, тестовый режим ' . ($g['config']['test'] ? 'вкл' : 'выкл'));
            $dirty = true;
            break;
        case 'admin_pt':
            $sids = isset($in['sids']) && is_array($in['sids']) ? $in['sids'] : [];
            foreach ($sids as $s) {
                $s = (string) $s;
                if (!in_array($s, SIDS, true)) continue;
                if (!empty($in['clear'])) unset($g['pts'][$s]);
                else $g['pts'][$s] = ['lat' => (float) $in['lat'], 'lng' => (float) $in['lng'], 'r' => max(5, min(200, (int) $in['r']))];
            }
            add_log($g, null, 'Точка станций ' . implode(', ', $sids) . (!empty($in['clear']) ? ' сброшена' : ' задана'));
            $dirty = true;
            break;
        case 'admin_grant':
            if (!in_array($team, TEAM_KEYS, true)) break;
            team_of($g, $team);
            if (in_array($sid, SIDS, true)) {
                if (!isset($g['teams'][$team]['done'][$sid])) $g['teams'][$team]['done'][$sid] = $now;
                $g['teams'][$team]['manual'][$sid] = 1;
                add_log($g, $team, 'организатор выдал шифр станции ' . $sid);
            } elseif (in_array($sid, FINAL_STEPS, true)) {
                $g['teams'][$team][$sid] = min_ts($g['teams'][$team][$sid], $now);
                add_log($g, $team, 'организатор засчитал шаг финала');
            }
            $dirty = true;
            break;
        case 'admin_resetatt':
            if (!in_array($team, TEAM_KEYS, true) || !in_array($sid, SIDS, true)) break;
            team_of($g, $team);
            $e = isset($g['teams'][$team]['att'][$sid]) ? $g['teams'][$team]['att'][$sid]['e'] : 0;
            $g['teams'][$team]['att'][$sid] = ['e' => $e + 1, 'n' => 0];
            add_log($g, $team, 'попытки станции ' . $sid . ' сброшены');
            $dirty = true;
            break;
        case 'admin_captain':
            if (!isset($g['players'][$tpid])) break;
            $k = $g['players'][$tpid]['team'];
            team_of($g, $k);
            $g['teams'][$k]['captain'] = $tpid;
            add_log($g, $k, $g['players'][$tpid]['name'] . ' назначен капитаном');
            $dirty = true;
            break;
        case 'admin_move':
            if (!isset($g['players'][$tpid]) || !in_array($team, TEAM_KEYS, true)) break;
            $old = $g['players'][$tpid]['team'];
            if ($old === $team) break;
            team_of($g, $old); team_of($g, $team);
            if ($g['teams'][$old]['captain'] === $tpid) $g['teams'][$old]['captain'] = next_captain($g, $old, $tpid);
            $g['players'][$tpid]['team'] = $team;
            if (!$g['teams'][$team]['captain']) $g['teams'][$team]['captain'] = $tpid;
            add_log($g, $team, $g['players'][$tpid]['name'] . ' переведён из «' . TEAM_NAMES[$old] . '»');
            $dirty = true;
            break;
        case 'admin_remove':
            if (!isset($g['players'][$tpid])) break;
            $k = $g['players'][$tpid]['team'];
            $nm = $g['players'][$tpid]['name'];
            unset($g['players'][$tpid]);
            if (isset($g['teams'][$k]) && $g['teams'][$k]['captain'] === $tpid) $g['teams'][$k]['captain'] = next_captain($g, $k, $tpid);
            add_log($g, $k, $nm . ' удалён из игры');
            $dirty = true;
            break;
        case 'admin_reset':
            $g = fresh_game($g);
            add_log($g, null, 'Игра сброшена: новая партия');
            $dirty = true;
            break;
        case 'admin_pin':
            $np = isset($in['newPin']) ? (string) $in['newPin'] : '';
            if (strlen($np) < 4) save_and_out($g, false, ['error' => 'short'], $lock, $FILE);
            $g['config']['pinHash'] = password_hash($np, PASSWORD_DEFAULT);
            add_log($g, null, 'PIN организатора изменён');
            $dirty = true;
            break;
        default:
            save_and_out($g, false, ['error' => 'unknown action'], $lock, $FILE);
    }
    save_and_out($g, $dirty, admin_view($g, $now), $lock, $FILE);
}

flock($lock, LOCK_UN);
out(400, ['error' => 'unknown action']);
