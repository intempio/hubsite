using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    public partial class BotMeetingPartcipant
    {
        [Key]
        public int RowId { get; set; }
        public string CallId { get; set; }
        [Column("ParticipantRowID")]
        public string ParticipantRowId { get; set; }
        public string UserId { get; set; }
        public string TenantId { get; set; }
        public string DisplayName { get; set; }
        public string ClientVersion { get; set; }
        public int? IsMuted { get; set; }
        public int? IsInLobby { get; set; }
        [Column("ThreadID")]
        public string ThreadId { get; set; }
        [Column("MessageID")]
        public string MessageId { get; set; }
        public string ReplyChainMessageId { get; set; }
        public string EventType { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedTime { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedTime { get; set; }
    }
}
