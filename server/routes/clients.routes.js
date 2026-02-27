const router = require("express").Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", (req, res) => {

    console.log("Datos recibidos:", req.body);
    const { nombre, telefono, email, empresa } = req.body;
    // Validación de campos
    if (!nombre || !telefono || !email || !empresa) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    
    // Enviar correo electrónico usando Resend
    resend.emails.send({
        from: email,
        to: "brianheredia200309@gmail.com",
        subject: "Nueva solicitud de servicio",
        html: `
            <h2>Nueva solicitud de servicio</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
        `,
    }).then(() => {
        res.status(200).json({ message: "Solicitud enviada con éxito." });
    }).catch((error) => {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ message: "Error al enviar la solicitud." });
    });

})

module.exports = router;
