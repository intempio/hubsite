using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("tbl_meeting_UserActivity")]
    public partial class TblMeetingUserActivity
    {
        [Column("SiteID")]
        public string SiteId { get; set; }
        public string Activity { get; set; }
        public string Email { get; set; }
        public DateTime? Date { get; set; }
        [Key]
        [Column("id")]
        public int Id { get; set; }
    }
}
