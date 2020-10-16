using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    public partial class BotMeeting
    {
        [Key]
        public int RowId { get; set; }
        public string CallId { get; set; }
        public string State { get; set; }
        public string CallChainId { get; set; }
        public string ThreadId { get; set; }
        public string MessageId { get; set; }
        public string ReplyChainMessageId { get; set; }
        [Column("SPItemId")]
        public string SpitemId { get; set; }
        public string SiteName { get; set; }
        [Column("SiteURL")]
        public string SiteUrl { get; set; }
        public string MeetingListName { get; set; }
        public string TeamName { get; set; }
        public string ChannelName { get; set; }
        public string MeetingName { get; set; }
        [Column("JoinURL")]
        public string JoinUrl { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        public string Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdateTime { get; set; }
        public int? NumberOfParticipants { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? FirstJoinTime { get; set; }
        public string HelpNotificationFlowStatus { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? HelpNotificationFlowLastRunTime { get; set; }
        public byte[] PowerAutomateTimeStamp { get; set; }
        [Column("SPItemStartTime", TypeName = "datetime")]
        public DateTime? SpitemStartTime { get; set; }
        [Column("SPItemEndTime", TypeName = "datetime")]
        public DateTime? SpitemEndTime { get; set; }
    }
}
