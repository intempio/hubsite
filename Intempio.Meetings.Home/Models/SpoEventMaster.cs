using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("spo_EventMaster")]
    public partial class SpoEventMaster
    {
        [Key]
        public int EventMasterId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? StartTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? FinishTime { get; set; }
        [Column("EventURL")]
        public string EventUrl { get; set; }
        public string Team { get; set; }
        public string Channel { get; set; }
        public string Speaker { get; set; }
        public string ProfileLink { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Created { get; set; }
        public Guid SiteId { get; set; }
        [Column("SPItemId")]
        public int? SpitemId { get; set; }
    }
}
