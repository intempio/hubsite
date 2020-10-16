using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

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
