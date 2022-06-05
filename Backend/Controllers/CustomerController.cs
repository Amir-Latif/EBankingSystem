using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Authorize(Roles = "customer")]
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
        public async Task<IActionResult> CreateAccount(CreateAccount request)
        {
            // Validating the request
            AccountTypes accountTypes = new();
            User? user = await _userManager.GetUserAsync(HttpContext.User);
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
        public async Task<IActionResult> MakeTransaction(MakeTransaction request)
        {
            // Request validation
            TransactionActions transactionActions = new();
            User? user = await _userManager.GetUserAsync(HttpContext.User);
            Account? account = _db.Accounts.FirstOrDefault(e => e.User == user);

            if (user is null ||
                !transactionActions.Contains(request.Action) ||
                request.Amount < 1
                )
                return Forbid();
            if (account is null)
                return new ObjectResult("No account associated with this user") { StatusCode = 405 };

            // Action
            if (request.Action == transactionActions.Withdraw)
            {
                if (account.Credit >= request.Amount)
                    account.Credit -= request.Amount;
                else return new ObjectResult("Insufficient credit") { StatusCode = 405 };
            }
            else if (request.Action == transactionActions.Deposit)
                account.Credit += request.Amount;
            else if (request.Action == transactionActions.Transfer)
            {
                Account? transferredTo = _db.Accounts.FirstOrDefault(e => e.Id == request.TransferredTo);
                if (transferredTo is null)
                    return new ObjectResult("The account that you want to transfer to does not exist") { StatusCode = 405 };
                if (account.Credit >= request.Amount)
                    account.Credit -= request.Amount;
                else return new ObjectResult("Insufficient credit") { StatusCode = 405 };

                account.Credit -= request.Amount;
                transferredTo.Credit += request.Amount;
            }

            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Get Transaction Logs
        [HttpGet("getTransactionLogs")]
        public async Task<IActionResult> GetTransactionLogs()
        {
            User? user = await _userManager.GetUserAsync(HttpContext.User);
            // Request Validation
            if (user == null)
                return Forbid();

            return Ok(user.Accounts);
        }
        #endregion
    }
}
