using Backend.Models;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Services.JWT
{
    public interface IJWTService
    {
        Task<JwtSecurityToken> CreateJwt(User user);
    }
}
