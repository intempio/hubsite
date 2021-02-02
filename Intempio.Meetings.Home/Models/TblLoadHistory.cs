using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Keyless]
    [Table("tbl_load_history")]
    public partial class TblLoadHistory
    {
        [Column("ID")]
        public int Id { get; set; }
        [Column("loadname")]
        public string Loadname { get; set; }
        [Column("siteurl")]
        public string Siteurl { get; set; }
        [Column("ops")]
        public string Ops { get; set; }
        [Column("eventname")]
        public string Eventname { get; set; }
        [Column("params")]
        public string Params { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("reason")]
        public string Reason { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
    }
}
