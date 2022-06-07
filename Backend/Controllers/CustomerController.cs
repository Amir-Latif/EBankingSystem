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

        #region Create Account
        [HttpPost("createAccount")]
        public async Task<IActionResult> CreateAccount([FromForm] CreateAccount request)
        {
            // Validating the request
            AccountTypes accountTypes = new();
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            if (user is null ||
                !accountTypes.Contains(request.Type) ||
                request.Credit < 1000
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
            return Ok(accountId);
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
                request.Amount < 1 ||
                account is null ||
                account.Status != statuses.Active
                )
                return Forbid();

            // Action
            if (request.Action == transactionActions.Withdraw)
            {
                if (account.Credit >= request.Amount)
                    account.Credit -= request.Amount;
                else return new ObjectResult("Insufficient credit") { StatusCode = 405 };

                _db.Transactions.Add(new Transaction()
                {
                    Type = transactionActions.Withdraw,
                    Amount = request.Amount,
                    AccountId = request.Account,
                });
            }

            else if (request.Action == transactionActions.Deposit)
            {
                account.Credit += request.Amount;

                _db.Transactions.Add(new Transaction()
                {
                    Type = transactionActions.Deposit,
                    Amount = request.Amount,
                    AccountId = request.Account,
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
                    Type = transactionActions.Withdraw,
                    Amount = request.Amount,
                    AccountId = request.Account,
                });


                _db.Transactions.Add(new Transaction()
                {
                    Type = transactionActions.Deposit,
                    Amount = request.Amount,
                    AccountId = request.TransferredTo!,
                });
            }

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Get Transaction Logs
        [HttpGet("getTransactionLog")]
        public async Task<IActionResult> GetTransactionLogs()
        {
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            // Request Validation
            if (user == null)
                return Forbid();

            var userAccounts = _db.Accounts.Where(e => e.UserId == user.Id);
            var accountsId = userAccounts.Select(e => e.Id);

            if (userAccounts is null)
                return Ok("You have not created accounts yet");

            return Ok(_db.Transactions.Where(e => accountsId.Contains(e.AccountId)));
        }
        #endregion
    }
}
