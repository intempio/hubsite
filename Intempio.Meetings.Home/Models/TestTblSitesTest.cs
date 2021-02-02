using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("test_tbl_sites_test")]
    public partial class TestTblSitesTest
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
