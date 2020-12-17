using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("old_tbl_sites")]
    public partial class OldTblSite
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }
        public string SiteId { get; set; }
        public string SiteName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Created { get; set; }
        public byte[] Updated { get; set; }
        public string LoadName { get; set; }
    }
}
