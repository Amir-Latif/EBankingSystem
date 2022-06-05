using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {
        #region Fields & Constructor
        private readonly UserManager<User> _userManager;
        private readonly IUserStore<User> _userStore;
        private readonly IUserEmailStore<User> _emailStore;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;


        public IdentityController(
            UserManager<User> userManager,
            IUserStore<User> userStore,
            SignInManager<User> signInManager,
            IEmailSender emailSender
            )
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _emailSender = emailSender;
        }
        #endregion

        #region Register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] CredentialsRequest request)
        {
            Statuses statuses = new();

            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (request.Phone.Length != 11 || request.Phone[..2] != "01")
                return new ObjectResult("Incorrect credentials") { StatusCode = 406 };
            User? user = _userManager.FindByEmailAsync(request.Email).Result;
            if (user is not null && user.Status == statuses.Suspended)
                return new ObjectResult("The user is suspended") { StatusCode = 403 };

            // Register User
            User newUser = new()
            {
                Name = request.Name,
                UserName = request.Email,
                Email = request.Email,
                PhoneNumber = request.Phone
            };

            var result = await _userManager.CreateAsync(newUser, request.Password);
            if (!result.Succeeded)
                return new ObjectResult(result.Errors.First()) { StatusCode = 406 };

            await _userStore.SetUserNameAsync(newUser, request.Email, CancellationToken.None);
            await _emailStore.SetEmailAsync(newUser, request.Email, CancellationToken.None);

            // Add role
            Roles roles = new();
            await _userManager.AddToRoleAsync(newUser, roles.Customer);

            // Prepare Confirmation Url
            var userId = await _userManager.GetUserIdAsync(await _userManager.FindByEmailAsync(request.Email));
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            string EmailConfirmationUrl = $"{Request.Scheme}://{Request.Host}/api/identity/confirm?userId={userId}&code={code}";

            // Send Confirmation Email
            string htmlMessage = $"<p>Thank you for your registration</p><p> Kindly <a href=\"{EmailConfirmationUrl}\"> confirm your email </a></p>";

            await _emailSender.SendEmailAsync(request.Email, "Identity Verification", htmlMessage);
            return Ok();
        }
        #endregion

        #region Confirm
        [HttpGet("confirm")]
        public async Task<IActionResult> Confirm(string userId, string code)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (userId is null || code is null)
            {
                return BadRequest("Invalid URL");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
            {
                return BadRequest("Unable to load a user.");
            }

            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded) return Ok("Thank you for confirming your email.");
            else return Forbid(result.Errors.First().Description);
        }
        #endregion

        #region Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, !string.IsNullOrEmpty(request.RememberMe), true);

            if (result.Succeeded) return Ok();
            else if (result.IsLockedOut) return new ObjectResult("This account is locked out") { StatusCode = 403 };
            else if (result.IsNotAllowed) return new ObjectResult("Kindly confirm you email through the mail sent to you") { StatusCode = 403 };
            else if (!result.Succeeded) return new ObjectResult("Wrong credentials") { StatusCode = 403 };
            else return Forbid();
        }
        #endregion

        #region Logout
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
        #endregion

        #region ChangePassword
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromForm] ChangePasswordRequest request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user is null) return BadRequest("Invalid user");

            var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

            if (result.Succeeded) return Ok();
            else return new ObjectResult(result.Errors.First()) { StatusCode = 403 };
        }
        #endregion

        #region Helping Functions
        private IUserEmailStore<User> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<User>)_userStore;
        }
        #endregion
    }
}