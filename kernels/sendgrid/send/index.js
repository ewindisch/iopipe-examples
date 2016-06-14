// using SendGrid's Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
module.exports = function(event, context) {
  var sendgrid = require("sendgrid")(event.key);
  var email = new sendgrid.Email();

  for (addr of event.to) {
    email.addTo(addr);
  }
  email.setFrom(event.from);
  email.setSubject(event.subject);
  email.setHtml(event.content);

  sendgrid.send(email, (err, json) => {
    if (err) { return context.fail() }
    return context.succeed(json)
  })
}
