using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class BotMeetingsViewForPa
    {
        public int RowId { get; set; }
        public string State { get; set; }
        public string ThreadId { get; set; }
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
        [Column("attendees")]
        public int? Attendees { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? FirstJoinTime { get; set; }
    }
}
