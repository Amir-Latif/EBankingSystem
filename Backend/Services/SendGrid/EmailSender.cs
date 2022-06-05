using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Backend.Services.SendGrid
{
    public class EmailSender : IEmailSender
    {
        private readonly AuthMessageSenderOptions _options;

        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            _options = optionsAccessor.Value;
        }
        public async Task SendEmailAsync(string toEmail, string subject, string htmlMessage)
        {
            if (string.IsNullOrEmpty(_options.Key))
            {
                throw new Exception("Null SendGridKey");
            }

            var filePath = $"{Directory.GetCurrentDirectory()}\\Services\\SendGrid\\EmailTemplate.html";
            var stream = new StreamReader(filePath);
            var mailTemplate = stream.ReadToEnd();
            stream.Close();

            var body = mailTemplate.Replace("[message]", htmlMessage);

            var client = new SendGridClient(_options.Key);

            var msg = MailHelper.CreateSingleEmail(
                        new EmailAddress(_options.Email, "Team 12 - Sprints"),
                        new EmailAddress(toEmail),
                        subject,
                        body,
                        body
                                                    );
            // Disable click tracking.
            // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
            msg.SetClickTracking(false, false);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
