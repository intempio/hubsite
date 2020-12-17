using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    public partial class MeetingParticipantsActivitiesView
    {
        [Column("ThreadID")]
        public string ThreadId { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public string EventType { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedTime { get; set; }
    }
}
