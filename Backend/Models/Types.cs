namespace Backend.Models
{
    public class BankType
    {
        public bool Contains(string property)
        {
            if (GetType().GetProperty(property) is null) return false;
            else return true;
        }
    }
    public class Roles : BankType
    {
        public string Admin { get; } = "Admin";
        public string Customer { get; } = "Customer";
    }
    public class Statuses : BankType
    {
        public string Active { get; set; } = "Active";
        public string Pending { get; set; } = "Pending";
        public string Suspended { get; set; } = "Suspended";
    }
    public class AccountTypes : BankType
    {
        public string Current { get; set; } = "Current";
        public string Saving { get; set; } = "Saving";
    }
    public class TransactionActions : BankType
    {
        public string Withdraw { get; set; } = "Withdraw";
        public string Deposit { get; set; } = "Deposit";
        public string Transfer { get; set; } = "Transfer";
    }
}
