﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Intempio.Meetings.Home.Services;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

using Microsoft.Extensions.Configuration;
using System.IO;

namespace Intempio.Meetings.Home.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MeetingController : Controller
    {
        private readonly Services.BlobStorageService bs;

        public MeetingController(IConfiguration configuration)
        {
                bs = new BlobStorageService(configuration);

        }

        [HttpGet("GetMeetingInfo")]
        public async Task<IActionResult> GetMeetingInfo()
        {
            var response = await EventService.GraphApiGetEventInfoSharePointList();

            return Ok(response);
        }

        [HttpGet("GetMeetings")]
        public async Task<IActionResult> GetMeetings()
        {
            var response = await EventService.GraphApiGetEventSharePointList();

            return Ok(response);
        }

        [HttpGet("GetPosterSessions")]
        public async Task<IActionResult> GetPosterSessions()
        {
            var response = await EventService.GetPosterSessions();

            return Ok(response);
        }


        [HttpGet("GetMatchMakingTable")]
        public async Task<IActionResult> GetMatchMakingTable()
        {
            var response = await EventService.GraphApiGetMatcMakingSharePointList();

            return Ok(response);
        }

        [HttpGet("GetUserByEmail")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var response = await EventService.GraphApiGetUserFromSharePointList(email);

            return Ok(response);
        }


        [HttpGet("GetSiteInfo")]
        public async Task<IActionResult> GetSiteInfo(string sitename)
        {
            var response = await EventService.GraphApiGetSiteID(sitename);

            return Ok(response);
        }
        [HttpGet("GetListInfo")]
        public async Task<IActionResult> GetListInfo(string sitename)
        {
            var response = await EventService.GraphApiGetLists(sitename);

            return Ok(response);
        }

        

        [HttpGet("GetUserEventsByEmail")]
        public async Task<IActionResult> GetUserEventsByEmail(string email)
        {
            var response = await EventService.GraphApiGetUserEventsByEmailFromSharePointList(email);

            return Ok(response);
        }



        [HttpGet("GetPresenters")]
        public async Task<IActionResult> GetPresenters()
        {
            var response = await EventService.GraphApiGetPresentersSharePointList();

            return Ok(response);
        }

        [HttpPost("UploadVideo")]
        public async Task<IActionResult> UploadVideo([FromForm(Name = "formFile")] IFormFile formFile,string email , string blobcontainer)
        {
            var emailId = email;
            var memoryStream = new MemoryStream();
            formFile.CopyTo(memoryStream);
            var fileBytes = memoryStream.ToArray();
            string container = blobcontainer;
            var fileUrl = await bs.UploadFileToBlobAsync(formFile.FileName,email, fileBytes, formFile.ContentType, container);
            return Ok(JsonConvert.SerializeObject( fileUrl));
        }

        [HttpGet("GetAllFilesFoldersOfPreWork")]
        public String GetAllFilesFoldersOfPreWork()
        {
            //String System.IO.Directory.GetDirectories(System.IO.Directory.GetCurrentDirectory() + "/CLientApp/src/assets");

            //return JsonConvert.SerializeObject(System.IO.Directory.GetDirectories(System.IO.Directory.GetCurrentDirectory() + "/CLientApp/src/assets"));
            //return JsonConvert.SerializeObject(System.IO.Directory.GetFiles(@"D:\home\\site\\wwwroot\staticfiles\resources", "*", System.IO.SearchOption.AllDirectories));
            try
            {
                return JsonConvert.SerializeObject(System.IO.Directory.GetFiles(@"D:\home\\site\\wwwroot\staticfiles\prework", "*", System.IO.SearchOption.AllDirectories));
            }
            catch (Exception ex)
            {
                return "{}";
            }

        }

        [HttpGet("GetAllFilesFolders")]
        public String GetAllFilesFolders()
        {
            //String System.IO.Directory.GetDirectories(System.IO.Directory.GetCurrentDirectory() + "/CLientApp/src/assets");

            //return JsonConvert.SerializeObject(System.IO.Directory.GetDirectories(System.IO.Directory.GetCurrentDirectory() + "/CLientApp/src/assets"));
            //return JsonConvert.SerializeObject(System.IO.Directory.GetFiles(@"D:\home\\site\\wwwroot\staticfiles\resources", "*", System.IO.SearchOption.AllDirectories));
            try
            {
                return JsonConvert.SerializeObject(System.IO.Directory.GetFiles(@"D:\home\\site\\wwwroot\staticfiles\resources", "*", System.IO.SearchOption.AllDirectories));
            }
            catch (Exception ex)
            {
                return "{}";
            }

        }


        [HttpGet("GetMenuItems")]
        public  IActionResult GetMenu(string container, string levels)
        {

            List<string> response= new List<string>();
            if (levels == "1")
            {
                response = bs.ListFirstLevelFiles(container);
            }
            else if (levels == "2")
            {
                response = bs.ListFirstLevelFoldersAndInsideFiles(container);
            }
            return Ok(response);
        }

        [HttpGet("GetAllYammer")]
        public async Task<IActionResult> GetAllYammer()
        {
            var response = await EventService.GetAllYammer();

            return Ok(response);
        }

        [HttpPost("PostYammer")]
        public async Task<IActionResult> PostYammer(string msg, [FromForm(Name = "formFile")] IFormFile formFile)
        {

            var response = await EventService.PostYammer(msg, formFile);
            return Ok(response);
        }


        [HttpGet("GetUserEventsByEmailSQL")]
        public async Task<IActionResult> GetUserEventsByEmailSQL(string email)
        {
            var response = await EventService.GetUserEventsByEmailSQL(email);

            return Ok(response);
        }

        [HttpGet("GetAllEventSQL")]
        public async Task<IActionResult> GetAllEventSQL()
        {
            var response = await EventService.GetAllMeetingsSQL();

            return Ok(response);
        }

        [HttpGet("GetSuperUser")]
        public async Task<IActionResult> GetSuperUser(string email)
        {
            var response = await EventService.GraphApiGetSuperUserFromSharePointList(email);

            return Ok(response);
        }
    }
}