using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
