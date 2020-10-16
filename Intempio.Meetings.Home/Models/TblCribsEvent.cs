using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("tbl_cribs_event")]
    public partial class TblCribsEvent
    {
        [Required]
        public string Id { get; set; }
        public DateTime? CreationTime { get; set; }
    }
}
