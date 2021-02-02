using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("old_tbl_meetings")]
    [Index(nameof(SiteId), nameof(MeetingCode), Name = "tbl_meetings_siteid_meetingcode")]
    public partial class OldTblMeeting
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
    }
}
