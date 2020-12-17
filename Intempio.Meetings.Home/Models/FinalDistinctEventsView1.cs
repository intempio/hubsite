using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("FinalDistinctEventsView1")]
    public partial class FinalDistinctEventsView1
    {
        public string SiteId { get; set; }
        public string LoadName { get; set; }
    }
}
