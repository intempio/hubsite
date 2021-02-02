﻿using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("st2h_tbl_meeting_user")]
    [Index(nameof(Email), nameof(EventId), Name = "meetings_user_index")]
    public partial class St2hTblMeetingUser
    {
        [Required]
        public string Title { get; set; }
        public string Email { get; set; }
        [Column("EventID")]
        public string EventId { get; set; }
        public int? Status { get; set; }
        [Column("SPItemId")]
        public int? SpitemId { get; set; }
    }
}
