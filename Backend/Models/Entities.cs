using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class User : IdentityUser
    {
        static Statuses statuses = new();
        public string Name { get; set; }
        public string Status { get; set; } = statuses.Pending;
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Account> Accounts { get; set; }
    }
    public class Account
    {
        static Statuses statuses = new();

        public string Id { get; set; }
        public string Type { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public long Credit { get; set; } = 1000;
        public string Status { get; set; } = statuses.Pending;
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
    public class Transaction
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        // Withdrawal or Deposit
        public string Type { get; set; }
        public long Amount { get; set; }
        public string AccountId { get; set; }
        public Account Account { get; set; }
        public bool Approved { get; set; } = false;
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
