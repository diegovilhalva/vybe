// config/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});

const sendMail = async (to, otp) => {
    await transporter.sendMail({
        from: '"Vybe Social" <vybe-social@zohomail.com>',
        subject: 'Código de Verificação - Vybe',
        to: to,
        html: `
                <p>Olá,</p>
                <p>Você solicitou a redefinição de senha. Use o código abaixo para continuar:</p>
                <h2 style="color: #E02020;">${otp}</h2>
                <p>O código expira em 10 minutos.</p>
                <br />
                <p>Se você não solicitou isso, apenas ignore este e-mail.</p>
                <p>Equipe Vybe</p>
        `
    })
}

export default sendMail