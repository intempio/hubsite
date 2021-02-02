using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public string Url { get; set; }
    }
}
