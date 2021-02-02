using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class MeetingView
    {
        [Column("Start Time", TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column("End Time", TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        public string Channel { get; set; }
        public string Description { get; set; }
        [Column("Event URL")]
        public string EventUrl { get; set; }
        public string Email { get; set; }
        public string SiteId { get; set; }
    }
}
