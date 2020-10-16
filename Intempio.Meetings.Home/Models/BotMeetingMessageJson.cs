using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

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
