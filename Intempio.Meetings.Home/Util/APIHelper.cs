
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Net;
using System.Collections.Specialized;
using System.IO;
using System.Globalization;
using Microsoft.AspNetCore.Http;

namespace Intempio.Meetings.Home.Util
{
    public class APIHelper
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="httpClient">HttpClient used to call the protected API</param>
        public APIHelper(HttpClient httpClient)
        {
            HttpClient = httpClient;
        }

        protected HttpClient HttpClient { get; private set; }


        /// <summary>
        /// Calls the protected Web API and processes the result
        /// </summary>
        /// <param name="webApiUrl">Url of the Web API to call (supposed to return Json)</param>
        /// <param name="accessToken">Access token used as a bearer security token to call the Web API</param>
        /// <param name="processResult">Callback used to process the result of the call to the Web API</param>
        public async Task<JsonResult> CallWebApiAndProcessResultASync(string webApiUrl, string accessToken, Action<JObject> processResult ,string email)
        {
            if (!string.IsNullOrEmpty(accessToken))
            {
                var defaultRequestHeaders = HttpClient.DefaultRequestHeaders;
                if (defaultRequestHeaders.Accept == null || !defaultRequestHeaders.Accept.Any(m => m.MediaType == "application/json"))
                {
                    HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                }
                defaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", accessToken);

                HttpResponseMessage response = await HttpClient.GetAsync(webApiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();



                    return null;
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Failed to call the Web Api: {response.StatusCode}");
                    string content = await response.Content.ReadAsStringAsync();

                    // Note that if you got reponse.Code == 403 and reponse.content.code == "Authorization_RequestDenied"
                    // this is because the tenant admin as not granted consent for the application to call the Web API
                    Console.WriteLine($"Content: {content}");
                }
                return null;
            }

            return null;

        }


        public async Task<JObject> CallWebApiAndProcessResultASyncV2(string webApiUrl, string accessToken, Action<JObject> processResult)
        {
            if (!string.IsNullOrEmpty(accessToken))
            {
                var defaultRequestHeaders = HttpClient.DefaultRequestHeaders;
                if (defaultRequestHeaders.Accept == null || !defaultRequestHeaders.Accept.Any(m => m.MediaType == "application/json"))
                {
                    HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                }
                defaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", accessToken);

                HttpResponseMessage response = await HttpClient.GetAsync(webApiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
                    JObject o = JObject.Parse(json);

            

                    return o;
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Failed to call the Web Api: {response.StatusCode}");
                    string content = await response.Content.ReadAsStringAsync();

                    // Note that if you got reponse.Code == 403 and reponse.content.code == "Authorization_RequestDenied"
                    // this is because the tenant admin as not granted consent for the application to call the Web API
                    Console.WriteLine($"Content: {content}");
                }
                return null;
            }

            return null;

        }

        public async Task<JsonResult> CallWebApiAndProcessResultASync(string webApiUrl, string accessToken, Action<JObject> processResult)
        {
            if (!string.IsNullOrEmpty(accessToken))
            {
                var defaultRequestHeaders = HttpClient.DefaultRequestHeaders;
                if (defaultRequestHeaders.Accept == null || !defaultRequestHeaders.Accept.Any(m => m.MediaType == "application/json"))
                {
                    HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                }
                defaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", accessToken);

                HttpResponseMessage response = await HttpClient.GetAsync(webApiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();
       
                    return new JsonResult(json);
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Failed to call the Web Api: {response.StatusCode}");
                    string content = await response.Content.ReadAsStringAsync();

                    // Note that if you got reponse.Code == 403 and reponse.content.code == "Authorization_RequestDenied"
                    // this is because the tenant admin as not granted consent for the application to call the Web API
                    Console.WriteLine($"Content: {content}");
                }
                return null;
            }

            return null;

        }

        public async Task<JsonResult> CallWebApiAndProcessResultASync(string webApiUrl, Action<JObject> processResult ,bool MozillaAent)
        {

            var defaultRequestHeaders = HttpClient.DefaultRequestHeaders;
            if (defaultRequestHeaders.Accept == null || !defaultRequestHeaders.Accept.Any(m => m.MediaType == "application/json"))
            {
                HttpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

            }
            if (MozillaAent)
            HttpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (compatible; AcmeInc/1.0)");
            HttpResponseMessage response = await HttpClient.GetAsync(webApiUrl);
                if (response.IsSuccessStatusCode)
                {
                    string json = await response.Content.ReadAsStringAsync();

                    return new JsonResult(json);
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Failed to call the Web Api: {response.StatusCode}");
                    string content = await response.Content.ReadAsStringAsync();

                    // Note that if you got reponse.Code == 403 and reponse.content.code == "Authorization_RequestDenied"
                    // this is because the tenant admin as not granted consent for the application to call the Web API
                    Console.WriteLine($"Content: {content}");
                }
                return null;

        }

        public async Task<JsonResult> CallYammerApiAndProcessResultASync(string webApiUrl, string accessToken, Action<JObject> processResult)
        {
            var messages = "";
            if (!string.IsNullOrEmpty(accessToken))
            {

                using (var cli = new WebClient())
                {
                    cli.Headers.Add("Authorization", "Bearer " + accessToken);
                    messages = cli.DownloadString(webApiUrl);


                }

                return new JsonResult(messages);
            }

            return null;

        }


        public async Task<JsonResult> CallYammerPostResultASync(string webApiUrl, string groupID, string accessToken, Action<JObject> processResult, string jsonContent, IFormFile formFile)
        {
            var responseString = "";

            if (!string.IsNullOrEmpty(accessToken))
            {
                using (var client = new WebClient())
                {
                    client.Headers.Add("Authorization", "Bearer " + accessToken);
                    client.Headers.Add("yammer-capabilities", "external-messaging,external-groups");


                    var values = new NameValueCollection();
                    values["group_id"] = groupID;
                    values["body"] = jsonContent;

                    var response = client.UploadValues(webApiUrl, "POST", values);

                    responseString = Encoding.Default.GetString(response);
                }

                //byte[] b;
                //using (BinaryReader br = new BinaryReader(formFile.OpenReadStream()))
                //{
                //    b = br.ReadBytes((int)formFile.OpenReadStream().Length);
                //    // Convert the image in to bytes
                //}
                //using (var client = new HttpClient())
                //{
                //    string token = accessToken;
                //    client.DefaultRequestHeaders.Add("Authorization", "Bearer" + token);
                //    using (var content = new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                //    {
                //        content.Add(new StreamContent(new MemoryStream(b)), "attachment", formFile.Name);

                //        using (var message = await client.PostAsync("https://www.yammer.com/api/v1/pending_attachments", content))
                //        {
                //            if (message.IsSuccessStatusCode)
                //            {
                //                var result = await message.Content.ReadAsStringAsync();

                //            }
                //        }
                //    }
                //}


            }

            return new JsonResult(responseString);
        }

        public async Task<JsonResult> CallWebApiAndPostResultASync(string webApiUrl, string accessToken, Action<JObject> processResult, string jsonContent)
        {
            if (!string.IsNullOrEmpty(accessToken))
            {
                var defaultRequestHeaders = HttpClient.DefaultRequestHeaders;
                if (defaultRequestHeaders.Accept == null || !defaultRequestHeaders.Accept.Any(m => m.MediaType == "application/json"))
                {
                    HttpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                }
                defaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", accessToken);

                using (var request = new HttpRequestMessage(HttpMethod.Post, webApiUrl))
                {
                            string content = @"{
                        ""accountEnabled"": true,
                        ""displayName"": ""Sujeewa"",
                        ""mailNickname"": ""Sujeewa"",
                        ""userPrincipalName"": ""sujeewae122_abc.com@intempio.com"",
                        ""passwordProfile"" : {
                                ""forceChangePasswordNextSignIn"": false,
                        ""password"": ""sujeewa@123""
                        }
                        }";

                   content = jsonContent;

                    using (var stringContent = new StringContent(content, Encoding.UTF8, "application/json"))
                    {
                        request.Content = stringContent;

                        using (var response = await HttpClient
                            .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                            .ConfigureAwait(false))
                        {
                         response.EnsureSuccessStatusCode();
                            return new JsonResult(jsonContent);
                        }
                    }
                }

           
                Console.ResetColor();
            }

            return  new JsonResult(false);
        }
    }
}
