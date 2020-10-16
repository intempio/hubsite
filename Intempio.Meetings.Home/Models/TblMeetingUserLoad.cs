using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("tbl_meeting_user_load")]
    public partial class TblMeetingUserLoad
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
