<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $nombre = $_POST["imObjectForm_3_1"];
    $email = $_POST["imObjectForm_3_2"];
    $asunto = $_POST["imObjectForm_3_3"];
    $mensaje = $_POST["imObjectForm_3_4"];

    // Destinatario del correo electrónico
    // $destinatario = "bioparquequillon@gmail.com";
    $destinatario =  "delegacionesbioparque@gmail.com";

    // Crear cuerpo del mensaje
    $cuerpoMensaje = "Nombre: $nombre\n";
    $cuerpoMensaje .= "Email: $email\n";
    $cuerpoMensaje .= "Asunto: $asunto\n";
    $cuerpoMensaje .= "Mensaje:\n$mensaje";

    // Cabeceras del correo electrónico
    $cabeceras = "From: $email\r\n";

    // Enviar correo electrónico
    if (mail($destinatario, $asunto, $cuerpoMensaje, $cabeceras)) {
        echo "Correo electrónico enviado con éxito.";
    } else {
        echo "Error al enviar el correo electrónico.";
    }
}
