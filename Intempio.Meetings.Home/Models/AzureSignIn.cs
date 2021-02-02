using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class AzureSignIn
    {
        public DateTime? TimeGenerated { get; set; }
        public string ResourceId { get; set; }
        public string OperationName { get; set; }
        public double? OperationVersion { get; set; }
        public string Category { get; set; }
        public string ResultType { get; set; }
        public string ResultSignature { get; set; }
        public string ResultDescription { get; set; }
        public string DurationMs { get; set; }
        public string CorrelationId { get; set; }
        public int Identitiy { get; set; }
        public int? Level { get; set; }
        public string Location { get; set; }
        public string RiskDetail { get; set; }
        public string RiskEventTypes { get; set; }
        public string RiskLevelAggregated { get; set; }
        public string RiskLevelDuringSignIn { get; set; }
        public string RiskState { get; set; }
        [Column("AADTenantId")]
        public string AadtenantId { get; set; }
        public string LocationDetails { get; set; }
        public string AppDisplayName { get; set; }
        public string ClientAppUsed { get; set; }
        public string AuthenticationDetails { get; set; }
        public string AuthenticationRequirementPolicies { get; set; }
        public string AuthenticationRequirement { get; set; }
        public string CreatedDateTime { get; set; }
        public string ConditionalAccessStatus { get; set; }
        public string ConditionalAccessPolicies { get; set; }
        public string Status { get; set; }
        [Column("MFADetail")]
        public string Mfadetail { get; set; }
        public string UserAgent { get; set; }
        public string NetworkLocationDetails { get; set; }
        public string AlternateSignInName { get; set; }
        public string UserDisplayName { get; set; }
        [Column("UserID")]
        public string UserId { get; set; }
        public string UserPrincipalName { get; set; }
    }
}
