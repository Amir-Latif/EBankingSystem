namespace Backend.Models
{
    public class CredentialsRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
    }

    public class ChangeCredentials : CredentialsRequest
    {
        public string CurrentPassword { get; set; }
    }
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? RememberMe { get; set; }
    }
    public class ChangePasswordRequest
    {
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
    public class RequestPasswordReset
    {
        public string Email { get; set; }
    }
    public class ResetPassword
    {
        public string UserId { get; set; }
        public string Code { get; set; }
        public string NewPassword { get; set; }
    }
    public class ManageCustomer
    {
        public string Id { get; set; }
        public string Status { get; set; }
    }
    public class ManageAccount
    {
        public string Account { get; set; }
        public string Status { get; set; }
    }
    public class CreateAccount
    {
        public string Type { get; set; }
        public long Credit { get; set; }
    }
    public class MakeTransaction
    {
        public string Action { get; set; }
        public long Amount { get; set; }
        public string Account { get; set; }
        public string? TransferredTo { get; set; }
    }
    public class GetTransaction
    {
        public string AccountId { get; set; }
    }
}
