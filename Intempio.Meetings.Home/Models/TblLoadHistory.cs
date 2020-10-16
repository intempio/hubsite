using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

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
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
    }
}
