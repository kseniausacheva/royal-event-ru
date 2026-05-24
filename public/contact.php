<?php
/**
 * Contact form endpoint for reg.ru hosting (PHP version)
 * Sends email via Yandex SMTP using raw socket — no external libraries required.
 */

header('Content-Type: application/json; charset=utf-8');

// ===== CONFIG =====
$EMAIL_USER = 'baxgat@yandex.ru';
$EMAIL_PASS = 'wepjrqgubfgydwes';
$SMTP_HOST  = 'smtp.yandex.ru';
$SMTP_PORT  = 465;
$RECIPIENT  = 'baxgat@yandex.ru';
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

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$messenger = trim($input['messenger'] ?? '');
$message = trim($input['message'] ?? '');
$mailingConsent = !empty($input['mailingConsent']);

if ($name === '' || $email === '' || $phone === '' || $messenger === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Все поля обязательны для заполнения']);
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

$mailingText = $mailingConsent ? 'Да' : 'Нет';
$dateStr = date('d.m.Y H:i', time() + 3 * 3600);

$htmlBody = "
<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
  <h2 style='color: #1a1a1a; border-bottom: 2px solid #e91e8c; padding-bottom: 10px;'>
    Новая заявка с сайта
  </h2>
  <table style='width: 100%; border-collapse: collapse; margin-top: 20px;'>
    <tr><td style='padding: 10px; font-weight: bold; color: #555; width: 150px;'>Имя:</td><td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($name) . "</td></tr>
    <tr style='background: #f9f9f9;'><td style='padding: 10px; font-weight: bold; color: #555;'>Email:</td><td style='padding: 10px; color: #1a1a1a;'><a href='mailto:" . escapeHtml($email) . "'>" . escapeHtml($email) . "</a></td></tr>
    <tr><td style='padding: 10px; font-weight: bold; color: #555;'>Телефон:</td><td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($phone) . "</td></tr>
    <tr style='background: #f9f9f9;'><td style='padding: 10px; font-weight: bold; color: #555;'>Мессенджер:</td><td style='padding: 10px; color: #1a1a1a;'>" . escapeHtml($messenger) . "</td></tr>
    <tr><td style='padding: 10px; font-weight: bold; color: #555;'>Сообщение:</td><td style='padding: 10px; color: #1a1a1a;'>" . nl2br(escapeHtml($message)) . "</td></tr>
    <tr style='background: #f9f9f9;'><td style='padding: 10px; font-weight: bold; color: #555;'>Согласие на рассылку:</td><td style='padding: 10px; color: #1a1a1a;'>" . $mailingText . "</td></tr>
  </table>
  <p style='margin-top: 20px; font-size: 12px; color: #999;'>
    Отправлено с сайта royaleventandmice.ru &bull; " . $dateStr . "
  </p>
</div>
";

$subject = 'Новая заявка с сайта от ' . $name;
$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

// Build raw email message
$boundary = md5(uniqid('', true));
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

// ===== SMTP SENDING =====
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

    echo json_encode(['success' => true, 'message' => 'Заявка отправлена успешно']);
} catch (Exception $e) {
    @fclose($socket);
    http_response_code(500);
    echo json_encode([
        'error' => 'Ошибка отправки: ' . $e->getMessage(),
    ]);
}
