/*
 The MIT License (MIT)

Copyright (c) 2015 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using System;
using System.Globalization;
using System.IO;

namespace Intempio.Meetings.Home.Util
{
    /// <summary>
    /// Description of the configuration of an AzureAD public client application (desktop/mobile application). This should
    /// match the application registration done in the Azure portal
    /// </summary>
    public class AuthenticationConfig
    {


        /// <summary>
        /// instance of Azure AD, for example public Azure or a Sovereign cloud (Azure China, Germany, US government, etc ...)
        /// </summary>
        public string Instance { get; set; } = "https://login.microsoftonline.com/{0}";

        /// <summary>
        /// Graph API endpoint, could be public Azure (default) or a Sovereign cloud (US government, etc ...)
        /// </summary>
        public string ApiUrl { get; set; } = "https://graph.microsoft.com/";

        /// <summary>
        /// The Tenant is:
        /// - either the tenant ID of the Azure AD tenant in which this application is registered (a guid)
        /// or a domain name associated with the tenant
        /// - or 'organizations' (for a multi-tenant application)
        /// </summary>
        public string Tenant { get; set; }

        /// <summary>
        /// Guid used by the application to uniquely identify itself to Azure AD
        /// </summary>
        public string ClientId { get; set; }


        public string Security { get; set; }
        /// <summary>
        /// URL of the authority
        /// </summary>
        public string Authority
        {
            get
            {
                return String.Format(CultureInfo.InvariantCulture, Instance, Tenant);
            }
        }

        /// <summary>
        /// Client secret (application password)
        /// </summary>
        /// <remarks>Daemon applications can authenticate with AAD through two mechanisms: ClientSecret
        /// (which is a kind of application password: this property)
        /// or a certificate previously shared with AzureAD during the application registration 
        /// (and identified by the CertificateName property belows)
        /// <remarks> 
        public string ClientSecret { get; set; }

        /// <summary>
        /// Name of a certificate in the user certificate store
        /// </summary>
        /// <remarks>Daemon applications can authenticate with AAD through two mechanisms: ClientSecret
        /// (which is a kind of application password: the property above)
        /// or a certificate previously shared with AzureAD during the application registration 
        /// (and identified by this CertificateName property)
        /// <remarks> 
        public string CertificateName { get; set; }

        public class IntempioSettings
        {
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


            public string Title { get; set; }
            public string Description { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
            public string Location { get; set; }
            public string Active { get; set; }
            public string Menus { get; set; }
            public string Sections { get; set; }
            public string Banner { get; set; }
            public string AllEvents { get; set; }
            public string SQL { get; set; }
            public string Colour { get; set; }
            public string MenuFolder { get; set; }
            public string UploadFolder { get; set; }
            public string Video { get; set; }
            public string Yammer { get; set; }
            public string UnrecognizedLogin { get; set; }
            public string Excellogin { get; set; }
            public string LoadingFrequency { get; set; }
            public string SQLLogin { get; set; }
            public string GeneralChatName { get; set; }
            public string HelpChatName { get; set; }

            public string CustomChatGroups { get; set; }
            public string SiteIcon { get; set; }
            


        }
        public string SharedDocumentLibItems { get; set; }

        public IntempioSettings intempioSettings { get; set; }

        public string SiteURL { get; set; }







        public string GroupsURL { get; set; }



        public string ListInfo { get; set; }



        public string YammerTocken { get; set; }
        public string YammerUploadGroupID { get; set; }
        public string YammerPublicGroupID { get; set; }
        public string YammerPostGroupMessages { get; set; }
        public string YammerGetGroupMessages { get; set; }




        public string SQLConnectionString { get; set; }
        public string BLOBConnectionString { get; set; }

        /// <summary>
        /// Reads the configuration from a json file
        /// </summary>
        /// <param name="path">Path to the configuration json file</param>
        /// <returns>AuthenticationConfig read from the json file</returns>
        public static AuthenticationConfig ReadFromJsonFile(string path)
        {
            IConfigurationRoot Configuration;

            var builder = new ConfigurationBuilder()
             .SetBasePath(System.IO.Directory.GetCurrentDirectory())
            .AddJsonFile(path);

            Configuration = builder.Build();
            return Configuration.Get<AuthenticationConfig>();
        }
    }



}

