using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("old_tbl_meeting_user_load")]
    public partial class OldTblMeetingUserLoad
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
