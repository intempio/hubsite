using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("old_tbl_meeting_user")]
    [Index(nameof(SiteId), nameof(Email), Name = "tbl_meeting_user_siteid_email")]
    public partial class OldTblMeetingUser
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        public string Email { get; set; }
        public string MeetingCode { get; set; }
        public string SiteId { get; set; }
        public byte[] Created { get; set; }
    }
}
