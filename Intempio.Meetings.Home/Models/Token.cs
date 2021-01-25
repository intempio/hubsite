using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home.Models
{
    /// <summary>
    /// Token table
    /// </summary>
    public class Token
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public TokenType TokenType { get; set; }

        [NotMapped]
        public string TokenTypeValue
        {
            get
            {
                if (this.TokenType == TokenType.AppleToken)
                {
                    return "Apple Token";
                }
                else if (this.TokenType == TokenType.ApplicationToken)
                {
                    return "Application Token";
                }
                else if (this.TokenType == TokenType.FBToken)
                {
                    return "Facebook Token";
                }
                else if (this.TokenType == TokenType.LinkedInToken)
                {
                    return "LinkedIn Token";
                }
                else
                {
                    return string.Empty;
                }
            }
        }
        public string JWTToken { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        [NotMapped]
        private DateTime _CreatedDate;
        public DateTime Created
        {
            get
            {
                return _CreatedDate.ToUniversalTime();
            }
            set
            {
                _CreatedDate = value;
                _CreatedDate = DateTime.SpecifyKind(_CreatedDate, DateTimeKind.Utc);
            }
        }
        public string ModifiedBy { get; set; }
        [NotMapped]
        private DateTime? _ModifiedDate;
        public DateTime? Modified
        {
            get
            {
                if (_ModifiedDate.HasValue)
                {
                    return _ModifiedDate.GetValueOrDefault().ToUniversalTime();
                }
                else
                {
                    return null;
                }
            }
            set
            {
                if (value.HasValue)
                {
                    _ModifiedDate = value;
                    _ModifiedDate = DateTime.SpecifyKind(_ModifiedDate.GetValueOrDefault(), DateTimeKind.Utc);
                }
                else
                {
                    _ModifiedDate = null;
                }
            }
        }
    }

    /// <summary>
    /// Token data
    /// </summary>
    public class TokenData
    {
        public string AccessToken { get; set; }
        public int AccessTokenExpiresIn { get; set; }
        public string RefreshToken { get; set; }
        public int RefreshTokenExpiresIn { get; set; }

        public string FullName { get; set; }
        public int UserId { get; set; }
        public string Reference { get; set; }


    }

    /// <summary>
    /// Token types
    /// </summary>
    public enum TokenType
    {
        Default = -1,
        ApplicationToken = 0,
        FBToken = 1,
        GoogleToken = 2,
        AppleToken = 3,
        LinkedInToken = 4
    }

    public enum UserRole
    {
        SuperAdmin = 0,
        Admin = 1,
        Patient = 2,
        Analyzer = 3,
        Approver = 4
    }

    /// <summary>
    /// Refresh token data
    /// </summary>
    public class RefreshTokenObject
    {
        public string RefreshToken { get; set; }
    }
}
