using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home.Util
{
    public class Locations
    {
        public Locations()
        {
            // Set default values.
            Name = "value1_from_ctor";
        }
        public string Name { get; set; }


    }

    public class IntempioSettings
    {

        public IntempioSettings()
        {
            EventMasterURL = "sys";
            EventInfoURL = "sys";
            PosterSessionsURL = "sys";
            PresentersURL = "sys";
            MatchMakingURL = "sys";
            UserEventsURL = "sys";
            UsersURL = "sys";
            SuperUsersURL = "sys";
            SiteID = "sys";
            MeetingUserExcel = "sys";

        }
        public string EventMasterURL { get; set; }
        public string EventInfoURL { get; set; }

        public string PosterSessionsURL { get; set; }

        public string PresentersURL { get; set; }
        public string MatchMakingURL { get; set; }
        public string UserEventsURL { get; set; }
        public string UsersURL { get; set; }
        public string SuperUsersURL { get; set; }

        public string SiteID { get; set; }
        public string MeetingUserExcel { get; set; }

        



    }
}
