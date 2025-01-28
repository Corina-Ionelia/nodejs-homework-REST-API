// utils/sendEmail.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async(email, token) => {
    const msg = {
        to: email,
        from: '<adresa-ta-email>@example.com', // Înlocuiește cu email-ul verificat pe SendGrid
        subject: 'Verifică adresa de email',
        text: `Accesează linkul pentru a-ți verifica adresa de email: ${process.env.BASE_URL}/users/verify/${token}`,
        html: `<a href="${process.env.BASE_URL}/users/verify/${token}">Verifică adresa de email</a>`,
    };

    await sgMail.send(msg);
};

module.exports = sendVerificationEmail;