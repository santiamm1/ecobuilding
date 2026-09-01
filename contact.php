<?php
header('Content-Type: application/json; charset=utf-8');

$to = 'info@ecobuilding.com.ar';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Honeypot: bots fill hidden fields, humans don't.
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$type = trim($_POST['type'] ?? '');
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_fields']);
    exit;
}

$subject = "Consulta de $name — sitio web Ecobuilding";
$body = "Tipo: $type\nNombre: $name\nEmail: $email\nTeléfono: " . ($phone !== '' ? $phone : '-') . "\n\n$message";

// Envía desde un correo del propio dominio (mejor entregabilidad) y permite responder al visitante.
$headers = "From: Ecobuilding Web <no-responder@ecobuilding.com.ar>\r\n";
$headers .= "Reply-To: " . str_replace(["\r", "\n"], '', $email) . "\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
