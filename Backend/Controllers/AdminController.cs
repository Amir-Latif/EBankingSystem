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
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        #region Fields & Constructor
        private readonly ApplicationDbContext _db;
        private readonly UserManager<User> _userManager;

        public AdminController(
            ApplicationDbContext db,
            UserManager<User> userManager
            )
        {
            _db = db;
            _userManager = userManager;
        }
        #endregion

        #region Manage Customers
        // To manage user statuses (Active, Deactivated, Suspended)
        [HttpPost("manageCustomer")]
        public async Task<IActionResult> ManageCustomer(ManageCustomer request)
        {
            // Request Validation
            Statuses statuses = new();
            if (!statuses.Contains(request.Status))
                return BadRequest();

            var user = _userManager.FindByIdAsync(request.Id).Result;
            if (user is null)
                return new ObjectResult("User does not exist") { StatusCode = 406 };

            // HttpPost Action
            user.Status = request.Status;
            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Manage Accounts
        // To manage user accounts (Active, Deactivated, Suspended, Rejected)
        [HttpPost("manageAccount")]
        public async Task<IActionResult> ManageAccount([FromForm] ManageAccount request)
        {
            // Request Validation
            Statuses statuses = new();
            if (!statuses.Contains(request.Status))
                return BadRequest();

            Account? account = _db.Accounts.FirstOrDefault(e => e.Id == request.Account);
            if (account is null)
                return new ObjectResult("No such account") { StatusCode = 405 };

            // Request Action
            account.Status = request.Status;
            await _db.SaveChangesAsync();
            return Ok();
        }
        #endregion

        #region Get Customer Status
        [HttpGet("getCustomerStatus")]
        public IActionResult GetCustomerDetails()
        {
            var customers = _db.Users.Select(e => new
            {
                e.Id,
                e.Name,
                e.Status,
            }).ToList();

            return Ok(customers);
        }
        #endregion

        #region Get Account Status
        [HttpGet("getAccountStatus")]
        public IActionResult GetAccountDetails()
        {
            _db.Users.Load();

            var accounts = _db.Accounts.Select(e => new
            {
                e.Id,
                Name = e.User.Name,
                e.Status,
            }).ToList();

            return Ok(accounts);
        }
        #endregion

        #region Get Transaction Log
        [HttpGet("getCompleteTransactionLog")]
        public async Task<IActionResult> GetCompleteTransactionLog()
        {
            // Validation
            User? user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (user == null)
                return Forbid();

            // Action
            var transactions = _db.Transactions.Select(e => new
            {
                e.Id,
                e.Type,
                e.Amount,
                Transactor = _db.Accounts.First(a => a.Id == e.TransactorId).User.Name,
                TransferredTo = _db.Accounts.First(a => a.Id == e.TransferredToId).User.Name,
                e.Date
            }).ToList();
            return Ok(transactions);

        }
        #endregion
    }
}
