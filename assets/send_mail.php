require 'require 'vendor/autoload.php';

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $terms = isset($_POST['terms']);

    if ($name === '' || $phone === '' || !$terms) {
        $response['message'] = 'Заполните все обязательные поля.';
    } else {
        $mail = new PHPMailer;

        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Ваш SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email@example.com'; // Ваш email
        $mail->Password = 'your_password'; // Ваш пароль
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('your_email@example.com', 'Mailer');
        $mail->addAddress('recipient@example.com', 'Recipient'); // Получатель

        $mail->isHTML(true);
        $mail->Subject = 'Новая заявка';
        $mail->Body = "Имя: $name<br>Телефон: $phone";

        if ($mail->send()) {
            $response['success'] = true;
            $response['message'] = 'Ваше сообщение успешно отправлено.';
        } else {
            $response['message'] = 'Ошибка отправки сообщения. Пожалуйста, попробуйте еще раз.';
        }
    }
} else {
    $response['message'] = 'Некорректный запрос.';
}

header('Content-Type: application/json');
echo json_encode($response);
?>