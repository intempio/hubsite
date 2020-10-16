using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Index(nameof(ThreadId), Name = "ThreadId_Index")]
    public partial class BotMeetingMessage
    {
        [Key]
        public int RowId { get; set; }
        public string ThreadId { get; set; }
        public string SiteName { get; set; }
        [Column("SiteURL")]
        public string SiteUrl { get; set; }
        public string TeamName { get; set; }
        public string ChannelName { get; set; }
        public string MeetingName { get; set; }
        [Column("JoinURL")]
        public string JoinUrl { get; set; }
        public string MeetingMesssageId { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string ContentType { get; set; }
        public string Content { get; set; }
        [Column("createdDateTime", TypeName = "datetime")]
        public DateTime? CreatedDateTime { get; set; }
        public int? IsHelp { get; set; }
        public int? IsNotified { get; set; }
    }
}
