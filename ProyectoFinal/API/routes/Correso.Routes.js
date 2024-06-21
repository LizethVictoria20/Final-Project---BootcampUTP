import bravo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new bravo.TransactionalEmailsApi();
apiInstance.setApiKey(
  bravo.TransactionalEmailsApiApiKeys.apiKey,
  'hUOdAXLMDn0Qf29I'
);
async function main() {
  const sendSmtpEmail = new bravo.SendSmtpEmail();
  sendSmtpEmail.subject = "Hello world from brevo abd Nodejs";
  sendSmtpEmail.to = [
    { email: "jordanvalenciap@gmail.com", name: "Jordan Valencia" },
    { email: "smckillua@gmail.com", name: "Jordan" },
  ];
  sendSmtpEmail.htmlContent = "<h1>Hello world from brevo and Nodejs</h1><p>This is a test email sent using Brevo's SMTP API</p>"

  sendSmtpEmail.sender = {
    name: "Plexo",
    email: "david.patino1@utp.edu.co", //faltaría crearlo y ponerlo
  };
  const results = await apiInstance.sendTransacEmail(sendSmtpEmail);
  console.log(results);
}
main();
