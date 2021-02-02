using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
