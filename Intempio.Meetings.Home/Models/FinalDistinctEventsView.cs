using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class FinalDistinctEventsView
    {
        public string SiteId { get; set; }
        public string LoadName { get; set; }
    }
}
