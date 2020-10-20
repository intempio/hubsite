using Intempio.Meetings.Home.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home.Services
{
    public class OptionsService
    {

        private readonly IWritableOptions<IntempioSettings> _writableLocations;
        public OptionsService(IWritableOptions<IntempioSettings> writableLocations)
        {
            _writableLocations = writableLocations;
        }


        public void ChangeALL(string value)
        {
            var allvalues = value.Split("|");
            foreach(var v in allvalues)
            {
                if (v.IndexOf("#") > 0)
                {
                    var skey = v.Split('#')[0];
                    var sval = v.Split('#')[1];

                    Change(skey, sval);
                }
            }
        }
        //Update Locations:Name
        public void Change( string key,string value )
        {

            
            switch (key)
            {
                case "EventInfoURL":
                    _writableLocations.Update(opt => {
                        opt.EventInfoURL = value;
                    });
                    break;

                case "EventMasterURL":
                    _writableLocations.Update(opt => {
                        opt.EventMasterURL = value;
                    });
                    break;
                case "PosterSessionsURL":
                    _writableLocations.Update(opt => {
                        opt.PosterSessionsURL = value;
                    });
                    break;
                case "MatchMakingURL":
                    _writableLocations.Update(opt => {
                        opt.MatchMakingURL = value;
                    });
                    break;
                case "PresentersURL":
                    _writableLocations.Update(opt => {
                        opt.PresentersURL = value;
                    });
                    break;
                case "UserEventsURL":
                    _writableLocations.Update(opt => {
                        opt.UserEventsURL = value;
                    });
                    break;
                case "UsersURL":
                    _writableLocations.Update(opt => {
                        opt.UsersURL = value;
                    });
                    break;
                case "SuperUsersURL":
                    _writableLocations.Update(opt => {
                        opt.SuperUsersURL = value;
                    });
                    break;
                case "SiteID":
                    _writableLocations.Update(opt => {
                        opt.SiteID = value;
                    });
                    break;
            }
           
        }
    }
}
