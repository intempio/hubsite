using Intempio.Meetings.Home.Util;

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
            foreach (var v in allvalues)
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
        public void Change(string key, string value)
        {


            switch (key)
            {
                case "EventInfoURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.EventInfoURL = value;
                    });
                    break;

                case "EventMasterURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.EventMasterURL = value;
                    });
                    break;
                case "PosterSessionsURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.PosterSessionsURL = value;
                    });
                    break;
                case "MatchMakingURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.MatchMakingURL = value;
                    });
                    break;
                case "PresentersURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.PresentersURL = value;
                    });
                    break;
                case "UserEventsURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.UserEventsURL = value;
                    });
                    break;
                case "UsersURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.UsersURL = value;
                    });
                    break;
                case "SuperUsersURL":
                    _writableLocations.Update(opt =>
                    {
                        opt.SuperUsersURL = value;
                    });
                    break;
                case "SiteID":
                    _writableLocations.Update(opt =>
                    {
                        opt.SiteID = value;
                    });
                    break;
                case "MeetingUserExcel":
                    _writableLocations.Update(opt =>
                    {
                        opt.MeetingUserExcel = value;
                    });
                    break;
                case "Title":
                    _writableLocations.Update(opt =>
                    {
                        opt.Title = value;
                    });
                    break;
                case "Description":
                    _writableLocations.Update(opt =>
                    {
                        opt.Description = value;
                    });
                    break;
                case "StartDate":
                    _writableLocations.Update(opt =>
                    {
                        opt.StartDate = value;
                    });
                    break;
                case "EndDate":
                    _writableLocations.Update(opt =>
                    {
                        opt.EndDate = value;
                    });
                    break;
                case "Location":
                    _writableLocations.Update(opt =>
                    {
                        opt.Location = value;
                    });
                    break;
                case "Active":
                    _writableLocations.Update(opt =>
                    {
                        opt.Active = value;
                    });
                    break;
                case "Menus":
                    _writableLocations.Update(opt =>
                    {
                        opt.Menus = value;
                    });
                    break;
                case "Sections":
                    _writableLocations.Update(opt =>
                    {
                        opt.Sections = value;
                    });
                    break;
                case "Banner":
                    _writableLocations.Update(opt =>
                    {
                        opt.Banner = value;
                    });
                    break;
                case "AllEvents":
                    _writableLocations.Update(opt =>
                    {
                        opt.AllEvents = value;
                    });
                    break;
                case "SQL":
                    _writableLocations.Update(opt =>
                    {
                        opt.SQL = value;
                    });
                    break;
                case "Colour":
                    _writableLocations.Update(opt =>
                    {
                        opt.Colour = value;
                    });
                    break;
                case "MenuFolder":
                    _writableLocations.Update(opt =>
                    {
                        opt.MenuFolder = value;
                    });
                    break;
                case "UploadFolder":
                    _writableLocations.Update(opt =>
                    {
                        opt.UploadFolder = value;
                    });
                    break;
                case "Video":
                    _writableLocations.Update(opt =>
                    {
                        opt.Video = value;
                    });
                    break;
                case "Yammer":
                    _writableLocations.Update(opt =>
                    {
                        opt.Yammer = value;
                    });
                    break;
                case "UnrecognizedLogin":
                    _writableLocations.Update(opt =>
                    {
                        opt.UnrecognizedLogin = value;
                    });
                    break;
                case "Excellogin":
                    _writableLocations.Update(opt =>
                    {
                        opt.Excellogin = value;
                    });
                    break;
                case "LoadingFrequency":
                    _writableLocations.Update(opt =>
                    {
                        opt.LoadingFrequency = value;
                    });
                    break;
                case "SQLLogin":
                    _writableLocations.Update(opt =>
                    {
                        opt.SQLLogin = value;
                    });
                    break;
                case "GeneralChatName":
                    _writableLocations.Update(opt =>
                    {
                        opt.GeneralChatName = value;
                    });
                    break;
                case "HelpChatName":
                    _writableLocations.Update(opt =>
                    {
                        opt.HelpChatName = value;
                    });
                    break;

                case "CustomChatGroups":
                    _writableLocations.Update(opt =>
                    {
                        opt.CustomChatGroups = value;
                    });
                    break;
                case "SiteIcon":
                    _writableLocations.Update(opt =>
                    {
                        opt.SiteIcon = value;
                    });
                    break;
                case "LocalDate":
                    _writableLocations.Update(opt =>
                    {
                        opt.LocalDate = value;
                    });
                    break;
            }

        }
    }
}
