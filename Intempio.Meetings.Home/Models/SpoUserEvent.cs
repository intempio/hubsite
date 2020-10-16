using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("spo_UserEvents")]
    public partial class SpoUserEvent
    {
        [Key]
        public int UserEventsId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string EventId { get; set; }
        public Guid SiteId { get; set; }
        public int? EventIdLookupId { get; set; }
    }
}
