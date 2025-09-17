const nodemailer = require("nodemailer");

exports.prova = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "airgomailing@gmail.com",
      pass: "wctk flvn wvkg fuoq" 
    }
  });

  let info = await transporter.sendMail({
    from: '"Node.js Backend" airgomailing@gmail.com>',
    to: "897778@stud.unive.it",
    subject: "Email di prova da Node.js",
    text: "Tic tac figlio di puttana, ti sto svuotando il conto, premi su questo link per essere violentato. https://theuselessweb.com/",
    html: "<b>Tic tac figlio di puttana, ti sto svuotando il conto, premi su questo link per essere violentato. https://theuselessweb.com/</b>"
  });

  console.log("Messaggio inviato: %s", info.messageId);
}

