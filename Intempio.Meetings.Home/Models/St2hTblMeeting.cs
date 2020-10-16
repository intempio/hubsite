using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("st2h_tbl_meetings")]
    [Index(nameof(Title), nameof(Channel), Name = "meetings_index")]
    public partial class St2hTblMeeting
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Column("Start Time", TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column("End Time", TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        [Required]
        public string Team { get; set; }
        public string Channel { get; set; }
        [Column("Event URL")]
        public string EventUrl { get; set; }
        [Column("SPItemId")]
        public int? SpitemId { get; set; }
        public string Status { get; set; }
    }
}
