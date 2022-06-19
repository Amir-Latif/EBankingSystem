using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class User : IdentityUser
    {
        static readonly Statuses statuses = new();
        public string Name { get; set; }
        public string Status { get; set; } = statuses.Pending;
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Account> Accounts { get; set; }
    }
    public class Account
    {
        static readonly Statuses statuses = new();

        public string Id { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public long Credit { get; set; } = 1000;
        public string Status { get; set; } = statuses.Pending;
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
    }
    public class Transaction
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        // Withdrawal or Deposit or transfer
        public string Type { get; set; }
        public long Amount { get; set; }
        public string TransactorId { get; set; }
        public Account Transactor { get; set; }
        public string? TransferredToId { get; set; }
        public virtual Account TransferredTo { get; set; }
        public bool Approved { get; set; } = false;
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
    public class TransactionAccount
    {
        public int Id { get; set; }
        public string AccountId { get; set; }
        public Account Account { get; set; }
        public string TransactionId { get; set; }
        public Transaction Transaction { get; set; }
        public long Credit { get; set; }
    }
}
