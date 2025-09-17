const nodemailer = require("nodemailer");

exports.sendMail = async (mail, name, link) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "airgomailing@gmail.com",
            pass: "wctk flvn wvkg fuoq"
        }
    });

    await transporter.sendMail({
        from: "Airgo <airgomailing@gmail.com>",
        to: mail,
        subject: "Attivazione account compagnia aerea",
        text: "Buongiorno, " + name + ", premere su questo link per attivare l\'account e modificare la password." + link,
        html: "<p>Buongiorno, " + name + ", premere su questo <a href=" + link +">link</a> per attivare l\'account e modificare la password.</p>"
    });
}