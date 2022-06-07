using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> ManageCustomer([FromForm] ManageCustomer request)
        {
            // Request Validation
            Statuses statuses = new();
            if (!statuses.Contains(request.Status))
                return BadRequest();

            var user = _userManager.FindByEmailAsync(request.Email).Result;
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
                return new ObjectResult("No such account") { StatusCode = 405};

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
                e.Name,
                e.Email,
                e.Status,
            }).ToList();

            return Ok(customers);
        }
        #endregion
    }
}
