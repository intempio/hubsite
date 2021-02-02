using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class MeetingParticipantsView
    {
        [Column("ThreadID")]
        public string ThreadId { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
    }
}
