using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Authorize(Roles = "customer, admin")]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        #region Fields & Constructor
        private readonly ApplicationDbContext _db;
        private readonly UserManager<User> _userManager;

        public CustomerController(
            ApplicationDbContext db,
            UserManager<User> userManager
            )
        {
            _db = db;
            _userManager = userManager;
        }
        #endregion

        #region Get Customer Data
        [HttpGet("getCustomerData")]
        public async Task<IActionResult> GetCustomerData()
        {
            Statuses statuses = new();
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            // Validations
            if (user is null || user.Status != statuses.Active)
                return Forbid();

            // Action
            _db.Accounts.Load();

            Dictionary<string, object> userData = new()
            {
                {"id", user.Id },
                {"name", user.Name },
                {"email", user.Email },
                {"phone", user.PhoneNumber },
                {"address", user.Address },
                {"city", user.City },
                {"postal", user.PostalCode },
                {"country", user.Country },
                {"status", user.Status }
            };

            var accounts = user.Accounts;

            if (accounts is not null)
            {
                userData.Add("accounts", accounts.Select(a => new { a.Id, a.Type, a.Status }));
                userData.Add("totalBalance", accounts.Sum(a => a.Credit));
            }

            else
            {
                userData.Add("accounts", new List<Account>());
                userData.Add("totalBalance", 0);
            }

            return Ok(userData);
        }

        #endregion

        #region Create Account
        [HttpPost("createAccount")]
        public async Task<IActionResult> CreateAccount([FromForm] CreateAccount request)
        {
            // Validating the request
            AccountTypes accountTypes = new();
            Statuses statuses = new();
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (user is null ||
                !accountTypes.Contains(request.Type) ||
                request.Credit < 1000 ||
                user.Status != statuses.Pending
                )
                return Forbid();


            // Action
            string accountId = Guid.NewGuid().ToString();
            _db.Accounts.Add(new Account()
            {
                Id = accountId,
                Type = request.Type,
                UserId = user.Id,
                Credit = request.Credit,
            });
            await _db.SaveChangesAsync();
            return Ok(_db.Accounts.Where(e => e.Id == accountId).Select(e => new { e.Id, e.Type, e.Status }));
        }
        #endregion

        #region Make Transaction
        [HttpPost("makeTransaction")]
        public async Task<IActionResult> MakeTransaction([FromForm] MakeTransaction request)
        {
            // Request validation
            TransactionActions transactionActions = new();
            Statuses statuses = new();
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            Account? account = _db.Accounts.FirstOrDefault(e => e.User == user);

            if (user is null ||
                !transactionActions.Contains(request.Action) ||
                request.Amount < 500 ||
                account is null ||
                account.Status != statuses.Active
                )
                return Forbid();

            // Action
            string transactionId = Guid.NewGuid().ToString();

            if (request.Action == transactionActions.Withdraw)
            {
                if (account.Credit >= request.Amount)
                    account.Credit -= request.Amount;
                else return new ObjectResult("Insufficient credit") { StatusCode = 405 };


                _db.Transactions.Add(new Transaction()
                {
                    Id = transactionId,
                    Type = transactionActions.Withdraw,
                    Amount = request.Amount,
                    TransactorId = request.Account,
                });
            }

            else if (request.Action == transactionActions.Deposit)
            {
                account.Credit += request.Amount;

                _db.Transactions.Add(new Transaction()
                {
                    Id = transactionId,
                    Type = transactionActions.Deposit,
                    Amount = request.Amount,
                    TransactorId = request.Account,
                });
            }

            else if (request.Action == transactionActions.Transfer)
            {
                // Validations
                Account? transferredTo = _db.Accounts.FirstOrDefault(e => e.Id == request.TransferredTo);
                if (transferredTo is null)
                    return new ObjectResult("The account that you want to transfer to does not exist") { StatusCode = 405 };
                if (transferredTo.Status != statuses.Active)
                    return new ObjectResult("The account that you want to transfer to is not activated") { StatusCode = 405 };

                // Action
                if (account.Credit >= request.Amount)
                    account.Credit -= request.Amount;
                else return new ObjectResult("Insufficient credit") { StatusCode = 405 };

                account.Credit -= request.Amount;
                transferredTo.Credit += request.Amount;

                _db.Transactions.Add(new Transaction()
                {
                    Id = transactionId,
                    Type = transactionActions.Withdraw,
                    Amount = request.Amount,
                    TransactorId = request.Account,
                    TransferredToId = request.TransferredTo!
                });
            }

            _db.TransactionAccounts.Add(new TransactionAccount()
            {
                AccountId = request.Account,
                TransactionId = transactionId,
                Credit = account.Credit
            });

            await _db.SaveChangesAsync();
            return Ok(transactionId);
        }
        #endregion

        #region Get Transaction Logs
        [HttpGet("getTransactionLog/{accountId}")]
        public async Task<IActionResult> GetTransactionLogs(string accountId)
        {
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            // Request Validation
            if (user is null || _db.Accounts.FirstOrDefault(e => e.UserId == user.Id && e.Id == accountId) is null)
                return Forbid();

            // Action
            return Ok(_db.Transactions
                    .Join(
                        _db.TransactionAccounts,
                        transaction => transaction.Id,
                        transactionAccount => transactionAccount.TransactionId,
                        (transaction, transactionAccount) => new
                        {
                            transaction.Id,
                            transaction.Date,
                            transaction.Type,
                            transaction.Amount,
                            transactionAccount.Credit
                        }
                    ).ToList());
        }
        #endregion

        #region Edit Customer Data
        [HttpPost("editCustomerData")]
        public async Task<IActionResult> EditCustomerData([FromForm] ChangeCredentials request)
        {
            Statuses statuses = new();
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            // Request Validation
            if (user == null || user.Status != statuses.Active)
                return Forbid();

            // Action
            user.PhoneNumber = request.Phone;
            user.UserName = request.Email;
            await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.Password);
            user.Email = request.Email;
            user.Address = request.Address;
            user.City = request.City;
            user.Country = request.Country;
            user.Name = $"{request.FirstName} {request.LastName}";
            user.PostalCode = request.PostalCode;

            await _db.SaveChangesAsync();
            return Ok();
        }


        #endregion
    }
}
