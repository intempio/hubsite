using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class LiveStatusView
    {
        public string MeetingName { get; set; }
        public int? NumberOfAttendees { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? MeetingStartingTime { get; set; }
    }
}
