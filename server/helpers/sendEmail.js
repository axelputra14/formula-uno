const { uuid, isUuid } = require("uuidv4");

const sendVerificationEmail = ({ id, email }, res, uniqueString) => {
  // url to be used in email
  const targetUrl = "https://axelputra14.site/";

  const href = `${targetUrl}` + "user/verify/" + id + "/" + uniqueString;
  console.log(href, "ini href");
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Welcome to Formula Uno! Verify your email",
    html: `<p>Verify your email address to complete the registration process.</p><p>Click this link to verify your account.</p>
        <a href="${href}">Verify your account</a>`,
  };

  return mailOptions;
};

module.exports = sendVerificationEmail;
