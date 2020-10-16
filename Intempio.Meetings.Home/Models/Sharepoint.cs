using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("Sharepoint")]
    public partial class Sharepoint
    {
        public DateTime? CreationTime { get; set; }
        public string Id { get; set; }
        public string Operation { get; set; }
        public string OrganizationId { get; set; }
        public int? RecordType { get; set; }
        public string UserKey { get; set; }
        public string UserType { get; set; }
        public string Version { get; set; }
        public string Workload { get; set; }
        [Column("ClientIP")]
        public string ClientIp { get; set; }
        public string ObjectId { get; set; }
        public string UserId { get; set; }
        public string CorrelationId { get; set; }
        public bool? DoNotDistributeEvent { get; set; }
        public string EventSource { get; set; }
        public string ItemType { get; set; }
        public string ListId { get; set; }
        public string Site { get; set; }
        public string UserAgent { get; set; }
        public string WebId { get; set; }
        public bool? IsDocLib { get; set; }
        public string ListBaseTemplateType { get; set; }
        public string ListBaseType { get; set; }
        public string ListColor { get; set; }
        public string ListIcon { get; set; }
        public string ListTitle { get; set; }
        public string EventData { get; set; }
        public string SiteUrl { get; set; }
        public string SourceFileName { get; set; }
        public string SourceRelativeUrl { get; set; }
        public string ApplicationDisplayName { get; set; }
        public string ApplicationId { get; set; }
    }
}
