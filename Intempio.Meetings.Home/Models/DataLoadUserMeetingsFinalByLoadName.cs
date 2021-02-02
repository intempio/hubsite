using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class DataLoadUserMeetingsFinalByLoadName
    {
        public string Email { get; set; }
        public string LoadName { get; set; }
    }
}
