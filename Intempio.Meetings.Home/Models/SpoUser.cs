using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    [Table("spo_Users")]
    public partial class SpoUser
    {
        [Key]
        public int UsersId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Group { get; set; }
        public bool? ShowAll { get; set; }
        public Guid SiteId { get; set; }
    }
}
