using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Backend.Services.Mail
{
    public class EmailService : IEmailService
    {
        private readonly MailSettings _mailSettings;

        public EmailService(IOptions<MailSettings> options)
        {
            _mailSettings = options.Value;
        }
        public async Task<Response> SendEmailAsync(
            string recepientMail, string recepientName, string mailSubject, string htmlMessage
            )
        {
            // The mail body
            var filePath = $"{Directory.GetCurrentDirectory()}\\Services\\Mail\\EmailTemplate.html";
            var stream = new StreamReader(filePath);
            var mailTemplate = stream.ReadToEnd();
            stream.Close();

            var body = mailTemplate.Replace("[message]", htmlMessage);
            body = body.Replace("[name]", recepientName);

            var client = new SendGridClient(_mailSettings.Key);
            var from = new EmailAddress(_mailSettings.Email, "Sprints Team 12");
            var subject = mailSubject;
            var to = new EmailAddress(recepientMail, recepientName);
            var plainTextContent = body;
            var htmlContent = body;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response;
        }
    }
}
