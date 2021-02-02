using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("tbl_user_activity")]
    public partial class TblUserActivity
    {
        public string UserId { get; set; }
        [Column("Activity_Date_Time")]
        public DateTime? ActivityDateTime { get; set; }
        [Column("Activity_type")]
        public string ActivityType { get; set; }
        public string ActivityId { get; set; }
    }
}
