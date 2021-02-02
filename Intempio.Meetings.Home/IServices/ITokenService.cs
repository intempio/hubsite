using Intempio.Meetings.Home.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home.IServices
{
    interface ITokenService
    {
        Task<int> AddProviderTokenByUserId(string token, int id, TokenType tokenType);
        Claim[] GetTokenClaims(string sub, DateTime dateTime, UserRole userRole, int userId);
        string GetSubFromToken(string tokenType, string token);
        string GenerateActiveToken(string email, UserRole userRole);
        string GenerateResetToken(string email, UserRole userRole);
        TokenData GenerateToken(
            string email, int accessExpirationInTotalSeconds, int refreshExpirationInTotalSeconds, UserRole userRole, int userId);
        string GetEmailByToken(string token);
        Task<bool> GetTokenByIdAsync(int id);

        Task<bool> DeleteTokensByUserId(int userId);
        Task<bool> ValidateByToken(string token, int userId, TokenType tokenType);
        Task<bool> InvalidateTokensByUserId(int userId);

        int GetUserIdFromToken(string token);
    }
}
