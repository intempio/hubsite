using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("BotMeetingMessageJson")]
    public partial class BotMeetingMessageJson
    {
        [Key]
        public int RowId { get; set; }
        public string ThreadId { get; set; }
        [Column("json")]
        public string Json { get; set; }
        public int? IsProcessed { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? TimeStamp { get; set; }
    }
}
