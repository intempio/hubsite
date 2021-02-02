using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

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
