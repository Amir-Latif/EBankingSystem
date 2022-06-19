using SendGrid;

namespace Backend.Services.Mail
{
    public interface IEmailService
    {
        Task<Response> SendEmailAsync(
         string recepientMail, string recepientName, string mailSubject, string htmlMessage
         );
    }
}
