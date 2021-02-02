using Intempio.Meetings.Home.Util;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Intempio.Meetings.Home.Models
{
    public partial class NibrContext : DbContext
    {

        AuthenticationConfig config = AuthenticationConfig.ReadFromJsonFile("appsettings.json");
        public NibrContext()
        {
        }

        public NibrContext(DbContextOptions<NibrContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AllMeetingView> AllMeetingViews { get; set; }
        public virtual DbSet<AzureSignIn> AzureSignIns { get; set; }
        public virtual DbSet<BotMeeting> BotMeetings { get; set; }
        public virtual DbSet<BotMeetingMessage> BotMeetingMessages { get; set; }
        public virtual DbSet<BotMeetingMessageJson> BotMeetingMessageJsons { get; set; }
        public virtual DbSet<BotMeetingPartcipant> BotMeetingPartcipants { get; set; }
        public virtual DbSet<BotMeetingsViewForPa> BotMeetingsViewForPas { get; set; }
        public virtual DbSet<DataLoadUserMeetingsFinalByLoadName> DataLoadUserMeetingsFinalByLoadNames { get; set; }
        public virtual DbSet<EntTblMeetingUser> EntTblMeetingUsers { get; set; }
        public virtual DbSet<EventMeetingsView> EventMeetingsViews { get; set; }
        public virtual DbSet<FinalDistinctEventsView> FinalDistinctEventsViews { get; set; }
        public virtual DbSet<FinalDistinctEventsView1> FinalDistinctEventsView1s { get; set; }
        public virtual DbSet<LiveStatusView> LiveStatusViews { get; set; }
        public virtual DbSet<MeetingParticipantsActivitiesView> MeetingParticipantsActivitiesViews { get; set; }
        public virtual DbSet<MeetingParticipantsView> MeetingParticipantsViews { get; set; }
        public virtual DbSet<MeetingView> MeetingViews { get; set; }
        public virtual DbSet<OldTblMeeting> OldTblMeetings { get; set; }
        public virtual DbSet<OldTblMeetingUser> OldTblMeetingUsers { get; set; }
        public virtual DbSet<OldTblMeetingUserLoad> OldTblMeetingUserLoads { get; set; }
        public virtual DbSet<OldTblSite> OldTblSites { get; set; }
        public virtual DbSet<Sharepoint> Sharepoints { get; set; }
        public virtual DbSet<SharepointActivity> SharepointActivities { get; set; }
        public virtual DbSet<SpoEventMaster> SpoEventMasters { get; set; }
        public virtual DbSet<SpoUser> SpoUsers { get; set; }
        public virtual DbSet<SpoUserEvent> SpoUserEvents { get; set; }
        public virtual DbSet<St2hAllmeetingView> St2hAllmeetingViews { get; set; }
        public virtual DbSet<St2hMeetingView> St2hMeetingViews { get; set; }
        public virtual DbSet<St2hTblMeeting> St2hTblMeetings { get; set; }
        public virtual DbSet<St2hTblMeetingUser> St2hTblMeetingUsers { get; set; }
        public virtual DbSet<TblCribsEvent> TblCribsEvents { get; set; }
        public virtual DbSet<TblLoadHistory> TblLoadHistories { get; set; }
        public virtual DbSet<TblMeetingUserActivity> TblMeetingUserActivities { get; set; }
        public virtual DbSet<TblMeetingUserFinal> TblMeetingUserFinals { get; set; }
        public virtual DbSet<TblMeetingUserLoad> TblMeetingUserLoads { get; set; }
        public virtual DbSet<TblMeetingsFinal> TblMeetingsFinals { get; set; }
        public virtual DbSet<TblMeetingsLoad> TblMeetingsLoads { get; set; }
        public virtual DbSet<TblSite> TblSites { get; set; }
        public virtual DbSet<TblUserActivity> TblUserActivities { get; set; }
        public virtual DbSet<TestTblLoadHistoryTest> TestTblLoadHistoryTests { get; set; }
        public virtual DbSet<TestTblMeetingUserFinalTest> TestTblMeetingUserFinalTests { get; set; }
        public virtual DbSet<TestTblMeetingUserLoadTest> TestTblMeetingUserLoadTests { get; set; }
        public virtual DbSet<TestTblMeetingsFinalTest> TestTblMeetingsFinalTests { get; set; }
        public virtual DbSet<TestTblMeetingsLoadTest> TestTblMeetingsLoadTests { get; set; }
        public virtual DbSet<TestTblSitesTest> TestTblSitesTests { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(config.SQLConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllMeetingView>(entity =>
            {
                entity.ToView("all_meeting_view");

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.EndTime)
                    .HasColumnName("End Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("Event URL");

                entity.Property(e => e.StartTime)
                    .HasColumnName("Start Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<AzureSignIn>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.AadtenantId).HasColumnName("AADTenantId");

                entity.Property(e => e.Identitiy).ValueGeneratedOnAdd();

                entity.Property(e => e.Mfadetail).HasColumnName("MFADetail");

                entity.Property(e => e.RiskEventTypes).IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");
            });

            modelBuilder.Entity<BotMeeting>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.FirstJoinTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.HelpNotificationFlowLastRunTime)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.HelpNotificationFlowStatus).HasDefaultValueSql("(N'NotRunning')");

                entity.Property(e => e.JoinUrl).HasColumnName("JoinURL");

                entity.Property(e => e.NumberOfActiveParticipants).HasDefaultValueSql("((0))");

                entity.Property(e => e.NumberOfParticipants).HasDefaultValueSql("((0))");

                entity.Property(e => e.PowerAutomateTimeStamp)
                    .IsRowVersion()
                    .IsConcurrencyToken();

                entity.Property(e => e.SiteUrl).HasColumnName("SiteURL");

                entity.Property(e => e.SpitemEndTime)
                    .HasColumnName("SPItemEndTime")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.SpitemId).HasColumnName("SPItemId");

                entity.Property(e => e.SpitemStartTime)
                    .HasColumnName("SPItemStartTime")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.UpdateTime).HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<BotMeetingMessage>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.CreatedDateTime)
                    .HasColumnName("createdDateTime")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.IsHelp).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsNotified).HasDefaultValueSql("((0))");

                entity.Property(e => e.JoinUrl).HasColumnName("JoinURL");

                entity.Property(e => e.SiteUrl).HasColumnName("SiteURL");
            });

            modelBuilder.Entity<BotMeetingMessageJson>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.IsProcessed).HasDefaultValueSql("((0))");

                entity.Property(e => e.Json).HasColumnName("json");

                entity.Property(e => e.TimeStamp)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<BotMeetingPartcipant>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.CreatedTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.IsInLobby).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsMuted).HasDefaultValueSql("((0))");

                entity.Property(e => e.MessageId).HasColumnName("MessageID");

                entity.Property(e => e.ParticipantRowId).HasColumnName("ParticipantRowID");

                entity.Property(e => e.ThreadId).HasColumnName("ThreadID");

                entity.Property(e => e.UpdatedTime).HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<BotMeetingsViewForPa>(entity =>
            {
                entity.ToView("BotMeetingsViewForPA");

                entity.Property(e => e.Attendees).HasColumnName("attendees");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.FirstJoinTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.JoinUrl).HasColumnName("JoinURL");

                entity.Property(e => e.RowId).ValueGeneratedOnAdd();

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.UpdateTime).HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<DataLoadUserMeetingsFinalByLoadName>(entity =>
            {
                entity.ToView("dataLoadUserMeetingsFinalByLoadName");
            });

            modelBuilder.Entity<EntTblMeetingUser>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.EventId).HasColumnName("EventID");

                entity.Property(e => e.SpitemId).HasColumnName("SPItemId");
            });

            modelBuilder.Entity<EventMeetingsView>(entity =>
            {
                entity.ToView("EventMeetingsView");

                entity.Property(e => e.BackupUrl).HasColumnName("BackupURL");

                entity.Property(e => e.Created).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.ThreadId).HasColumnName("ThreadID");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<FinalDistinctEventsView>(entity =>
            {
                entity.ToView("FinalDistinctEventsView");
            });

            modelBuilder.Entity<FinalDistinctEventsView1>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);
            });

            modelBuilder.Entity<LiveStatusView>(entity =>
            {
                entity.ToView("LiveStatusView");

                entity.Property(e => e.MeetingStartingTime).HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<MeetingParticipantsActivitiesView>(entity =>
            {
                entity.ToView("MeetingParticipantsActivitiesView");

                entity.Property(e => e.CreatedTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.ThreadId).HasColumnName("ThreadID");
            });

            modelBuilder.Entity<MeetingParticipantsView>(entity =>
            {
                entity.ToView("MeetingParticipantsView");

                entity.Property(e => e.ThreadId).HasColumnName("ThreadID");
            });

            modelBuilder.Entity<MeetingView>(entity =>
            {
                entity.ToView("meeting_view");

                entity.Property(e => e.EndTime)
                    .HasColumnName("End Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("Event URL");

                entity.Property(e => e.StartTime)
                    .HasColumnName("Start Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<OldTblMeeting>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<OldTblMeetingUser>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<OldTblMeetingUserLoad>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<OldTblSite>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<Sharepoint>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.ClientIp).HasColumnName("ClientIP");

                entity.Property(e => e.CorrelationId).IsUnicode(false);

                entity.Property(e => e.EventSource).IsUnicode(false);

                entity.Property(e => e.Id).IsUnicode(false);

                entity.Property(e => e.ItemType).IsUnicode(false);

                entity.Property(e => e.ListBaseTemplateType).IsUnicode(false);

                entity.Property(e => e.ListBaseType).IsUnicode(false);

                entity.Property(e => e.ListId).IsUnicode(false);

                entity.Property(e => e.ObjectId).IsUnicode(false);

                entity.Property(e => e.Operation).IsUnicode(false);

                entity.Property(e => e.OrganizationId).IsUnicode(false);

                entity.Property(e => e.SiteUrl).IsUnicode(false);

                entity.Property(e => e.SourceFileName).IsUnicode(false);

                entity.Property(e => e.SourceRelativeUrl).IsUnicode(false);

                entity.Property(e => e.UserAgent).IsUnicode(false);

                entity.Property(e => e.UserId).IsUnicode(false);

                entity.Property(e => e.UserKey).IsUnicode(false);

                entity.Property(e => e.UserType).IsUnicode(false);

                entity.Property(e => e.WebId).IsUnicode(false);
            });

            modelBuilder.Entity<SharepointActivity>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.ClientIp).HasColumnName("ClientIP");

                entity.Property(e => e.SiteUrl).IsUnicode(false);

                entity.Property(e => e.SourceFileName).IsUnicode(false);

                entity.Property(e => e.SourceRelativeUrl).IsUnicode(false);
            });

            modelBuilder.Entity<SpoEventMaster>(entity =>
            {
                entity.HasKey(x => x.EventMasterId)
                    .HasName("PK__spo_Even__1BCC78FDD6ED5C3C");

                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Channel).IsUnicode(false);

                entity.Property(e => e.Created).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.EventUrl)
                    .IsUnicode(false)
                    .HasColumnName("EventURL");

                entity.Property(e => e.FinishTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.ProfileLink).IsUnicode(false);

                entity.Property(e => e.Speaker).IsUnicode(false);

                entity.Property(e => e.SpitemId).HasColumnName("SPItemId");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Team).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);
            });

            modelBuilder.Entity<SpoUser>(entity =>
            {
                entity.HasKey(x => x.UsersId)
                    .HasName("PK__spo_User__A349B062E0A82C57");

                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.Group).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Role).IsUnicode(false);

                entity.Property(e => e.ShowAll).HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<SpoUserEvent>(entity =>
            {
                entity.HasKey(x => x.UserEventsId)
                    .HasName("PK__spo_User__6DCFA47286019CD3");

                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.EventId).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<St2hAllmeetingView>(entity =>
            {
                entity.ToView("st2h_allmeeting_view");

                entity.Property(e => e.EndTime)
                    .HasColumnName("End Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("Event URL");

                entity.Property(e => e.StartTime)
                    .HasColumnName("Start Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<St2hMeetingView>(entity =>
            {
                entity.ToView("st2h_meeting_view");

                entity.Property(e => e.EndTime)
                    .HasColumnName("End Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("Event URL");

                entity.Property(e => e.StartTime)
                    .HasColumnName("Start Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<St2hTblMeeting>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.EndTime)
                    .HasColumnName("End Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("Event URL");

                entity.Property(e => e.SpitemId).HasColumnName("SPItemId");

                entity.Property(e => e.StartTime)
                    .HasColumnName("Start Time")
                    .HasAnnotation("Relational:ColumnType", "datetime");
            });

            modelBuilder.Entity<St2hTblMeetingUser>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.EventId).HasColumnName("EventID");

                entity.Property(e => e.SpitemId).HasColumnName("SPItemId");
            });

            modelBuilder.Entity<TblCribsEvent>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).IsUnicode(false);
            });

            modelBuilder.Entity<TblLoadHistory>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.CreatedDate).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Eventname).HasColumnName("eventname");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Loadname).HasColumnName("loadname");

                entity.Property(e => e.Ops).HasColumnName("ops");

                entity.Property(e => e.Params).HasColumnName("params");

                entity.Property(e => e.Reason).HasColumnName("reason");

                entity.Property(e => e.Siteurl).HasColumnName("siteurl");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<TblMeetingUserActivity>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.SiteId).HasColumnName("SiteID");
            });

            modelBuilder.Entity<TblMeetingUserFinal>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TblMeetingUserLoad>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TblMeetingsFinal>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BackupUrl).HasColumnName("BackupURL");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TblMeetingsLoad>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BackupUrl).HasColumnName("BackupURL");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TblSite>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TblUserActivity>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.ActivityDateTime).HasColumnName("Activity_Date_Time");

                entity.Property(e => e.ActivityId).IsUnicode(false);

                entity.Property(e => e.ActivityType)
                    .IsUnicode(false)
                    .HasColumnName("Activity_type");
            });

            modelBuilder.Entity<TestTblLoadHistoryTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.CreatedDate).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Eventname).HasColumnName("eventname");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ID");

                entity.Property(e => e.Loadname).HasColumnName("loadname");

                entity.Property(e => e.Ops).HasColumnName("ops");

                entity.Property(e => e.Params).HasColumnName("params");

                entity.Property(e => e.Reason).HasColumnName("reason");

                entity.Property(e => e.Siteurl).HasColumnName("siteurl");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<TestTblMeetingUserFinalTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TestTblMeetingUserLoadTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TestTblMeetingsFinalTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TestTblMeetingsLoadTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.BackupUrl).HasColumnName("BackupURL");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EndTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.EventUrl).HasColumnName("EventURL");

                entity.Property(e => e.StartTime).HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            modelBuilder.Entity<TestTblSitesTest>(entity =>
            {
                entity.HasAnnotation("Relational:IsTableExcludedFromMigrations", false);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Created)
                    .HasDefaultValueSql("(getdate())")
                    .HasAnnotation("Relational:ColumnType", "datetime");

                entity.Property(e => e.Updated)
                    .IsRowVersion()
                    .IsConcurrencyToken();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
