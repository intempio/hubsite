using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("tbl_meetings_final")]
    public partial class TblMeetingsFinal
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        public string MeetingCode { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EndTime { get; set; }
        public string Team { get; set; }
        public string Channel { get; set; }
        [Column("EventURL")]
        public string EventUrl { get; set; }
        public string DailIn { get; set; }
        public string ConferenceId { get; set; }
        public string SiteId { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Created { get; set; }
        public byte[] Updated { get; set; }
        public string LoadName { get; set; }
        [Column("BackupURL")]
        public string BackupUrl { get; set; }
    }
}
