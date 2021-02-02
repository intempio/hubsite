using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("ent_tbl_meeting_user")]
    public partial class EntTblMeetingUser
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
