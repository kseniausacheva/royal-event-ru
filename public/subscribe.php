<?php
/**
 * Newsletter subscription endpoint for reg.ru hosting.
 * Принимает email подписчика и отправляет уведомление на baxgat@yandex.ru.
 * Использует тот же SMTP-механизм, что и contact.php.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ===== CONFIG =====
// Пароль SMTP не хранится в репозитории. Файл mail-config.php кладётся на сервер
// вручную (один раз) — уровнем выше корня сайта или рядом с этим скриптом.
// Образец: deploy/mail-config.example.php
$__cfg = null;
foreach ([dirname(__DIR__) . '/mail-config.php', __DIR__ . '/mail-config.php'] as $__p) {
    if (is_readable($__p)) { $__cfg = include $__p; break; }
}
if (!is_array($__cfg) || empty($__cfg['user']) || empty($__cfg['pass'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Сервер не настроен: отсутствует mail-config.php']);
    exit;
}
$EMAIL_USER = $__cfg['user'];
$EMAIL_PASS = $__cfg['pass'];
$SMTP_HOST  = $__cfg['host'] ?? 'smtp.yandex.ru';
$SMTP_PORT  = (int)($__cfg['port'] ?? 465);
$RECIPIENT  = $__cfg['recipient'] ?? $EMAIL_USER;
// ==================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$source = trim($input['source'] ?? 'blog');

if ($email === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Введите email']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный email']);
    exit;
}

function escapeHtml($str) {
    return htmlspecialchars($str, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$dateStr = date('d.m.Y H:i', time() + 3 * 3600);

$htmlBody = "
<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
  <h2 style='color: #1a1a1a; border-bottom: 2px solid #F72585; padding-bottom: 10px;'>
    Новая подписка на рассылку
  </h2>
  <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
    <tr><td style='padding: 10px; font-weight: bold; color: #555; width: 150px;'>Email:</td><td style='padding: 10px; color: #1a1a1a;'><a href='mailto:" . escapeHtml($email) . "'>" . escapeHtml($email) . "</a></td></tr>
    <tr style='background: #f9f9f9;'><td style='padding: 10px; font-weight: bold; color: #555;'>Источник:</td><td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($source) . "</td></tr>
    <tr><td style='padding: 10px; font-weight: bold; color: #555;'>Дата подписки:</td><td style='padding: 10px; color: #1a1a1a;'>" . $dateStr . "</td></tr>
  </table>
  <p style='margin-top: 20px; font-size: 12px; color: #999;'>
    Подписан с сайта royaleventandmice.ru
  </p>
</div>
";

$subject = 'Новая подписка на рассылку: ' . $email;
$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$from_name_encoded = '=?UTF-8?B?' . base64_encode('Royal Event Group') . '?=';

$rawMessage  = "From: $from_name_encoded <$EMAIL_USER>\r\n";
$rawMessage .= "To: <$RECIPIENT>\r\n";
$rawMessage .= "Reply-To: <$email>\r\n";
$rawMessage .= "Subject: $subjectEncoded\r\n";
$rawMessage .= "MIME-Version: 1.0\r\n";
$rawMessage .= "Content-Type: text/html; charset=UTF-8\r\n";
$rawMessage .= "Content-Transfer-Encoding: 8bit\r\n";
$rawMessage .= "Date: " . date('r') . "\r\n";
$rawMessage .= "\r\n";
$rawMessage .= $htmlBody . "\r\n";
$rawMessage .= ".\r\n";

// ===== SMTP SENDING (тот же механизм, что и в contact.php) =====
function smtpCmd($socket, $cmd, &$log) {
    if ($cmd !== '') {
        fwrite($socket, $cmd . "\r\n");
        $log .= ">> $cmd\n";
    }
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') break;
    }
    $log .= "<< $response";
    return $response;
}

$log = '';
$context = stream_context_create([
    'ssl' => [
        'verify_peer' => false,
        'verify_peer_name' => false,
    ]
]);

$socket = @stream_socket_client(
    "ssl://$SMTP_HOST:$SMTP_PORT",
    $errno,
    $errstr,
    30,
    STREAM_CLIENT_CONNECT,
    $context
);

if (!$socket) {
    http_response_code(500);
    echo json_encode(['error' => "Не удалось подключиться к почтовому серверу: $errstr ($errno)"]);
    exit;
}

stream_set_timeout($socket, 30);

try {
    smtpCmd($socket, '', $log);
    smtpCmd($socket, 'EHLO royaleventandmice.ru', $log);
    smtpCmd($socket, 'AUTH LOGIN', $log);
    smtpCmd($socket, base64_encode($EMAIL_USER), $log);
    smtpCmd($socket, base64_encode($EMAIL_PASS), $log);
    $r = smtpCmd($socket, "MAIL FROM:<$EMAIL_USER>", $log);
    if (strpos($r, '250') !== 0) throw new Exception('MAIL FROM rejected: ' . trim($r));
    $r = smtpCmd($socket, "RCPT TO:<$RECIPIENT>", $log);
    if (strpos($r, '250') !== 0) throw new Exception('RCPT TO rejected: ' . trim($r));
    $r = smtpCmd($socket, 'DATA', $log);
    if (strpos($r, '354') !== 0) throw new Exception('DATA rejected: ' . trim($r));
    fwrite($socket, $rawMessage);
    $r = smtpCmd($socket, '', $log);
    if (strpos($r, '250') !== 0) throw new Exception('Message rejected: ' . trim($r));
    smtpCmd($socket, 'QUIT', $log);
    fclose($socket);

    echo json_encode(['success' => true, 'message' => 'Подписка оформлена']);
} catch (Exception $e) {
    @fclose($socket);
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка отправки: ' . $e->getMessage(),
    ]);
}
