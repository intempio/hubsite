using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class St2hAllmeetingView
    {
        public string Description { get; set; }
        [Column("Start Time", TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column("End Time", TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        public string Channel { get; set; }
        [Column("Event URL")]
        public string EventUrl { get; set; }
    }
}
