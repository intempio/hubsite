using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Extensions.Configuration;

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Intempio.Meetings.Home.Util;

namespace Intempio.Meetings.Home.Services
{
    public class BlobStorageService
    {
        private readonly string accessKey = string.Empty;

        AuthenticationConfig config = AuthenticationConfig.ReadFromJsonFile("appsettings.json");

        public BlobStorageService(IConfiguration Configuration)
        {
            accessKey = config.BLOBConnectionString;
        }

        public List<string> ListFirstLevelFoldersAndInsideFiles(string container)
        {
            try
            {
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                string strContainerName = container;
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
                var list = cloudBlobContainer.ListBlobs().Where(b => b as CloudBlobDirectory != null).ToList();
                List<string> listfles = new List<string>();
                foreach (var item in list)
                {

                    //   string rpath = string.Format("{0}/{1}", container, ((Microsoft.Azure.Storage.Blob.CloudBlobDirectory)item).Prefix);

                    string rpath = ((Microsoft.Azure.Storage.Blob.CloudBlobDirectory)item).Prefix;
                    string folderName = rpath.Replace("/", "");

                    listfles.Add(folderName);

                    //foreach (var file in cloudBlobContainer.ListBlobs(prefix: rpath, useFlatBlobListing: false))
                    //{
                    //    string fname = string.Format("{0}#{1}", folderName, file);
                    //}

                    foreach (var menuname in cloudBlobContainer.ListBlobs(prefix: rpath))
                    {
                        string rpath2 = ((Microsoft.Azure.Storage.Blob.CloudBlobDirectory)menuname).Prefix;
                        string submenuName = rpath2.Replace(rpath, "").Replace("/", "");
                        listfles.Add(submenuName);
                        foreach (var file in cloudBlobContainer.ListBlobs(prefix: rpath2, useFlatBlobListing: false))
                        {
                            string filenamepath = ((Microsoft.Azure.Storage.Blob.CloudBlob)file).Name;

                         string fineurl=   ((Microsoft.Azure.Storage.Blob.CloudBlob)file).SnapshotQualifiedUri.AbsoluteUri;
                            if (filenamepath.IndexOf(".") > 0)
                            {
                                //fixing the multiple '.'
                                var tempextention = filenamepath.Replace(rpath2, "").Replace("/", "").Split(".");
                                var fileExtention = string.Format(".{0}", tempextention[tempextention.Length - 1]);
                                var fileName = filenamepath.Replace(rpath2, "").Replace("/", "").Replace(fileExtention, "");

                                string listItem = string.Format("{0}#{1}#{2}", submenuName, fileName, fineurl);
                                listfles.Add(listItem);
                            }
                        }


                    }

                }

                return listfles;
            }
            catch (Exception ex)
            {
                //throw new Exception();
                return new List<string>();

            }
        }

        public List<string> ListFirstLevelFiles(string container)
        {
            try
            {
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                string strContainerName = container;
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
                var list = cloudBlobContainer.ListBlobs().Where(b => b as CloudBlobDirectory != null).ToList();
                List<string> listfles = new List<string>();
                foreach (var item in list)
                {

                    //   string rpath = string.Format("{0}/{1}", container, ((Microsoft.Azure.Storage.Blob.CloudBlobDirectory)item).Prefix);

                    string rpath = ((Microsoft.Azure.Storage.Blob.CloudBlobDirectory)item).Prefix;
                    string folderName = rpath.Replace("/", "");

                    listfles.Add(folderName);

                    foreach (var file in cloudBlobContainer.ListBlobs(prefix: rpath, useFlatBlobListing: false))
                    {
                        string filenamepath = ((Microsoft.Azure.Storage.Blob.CloudBlob)file).Name;

                        string fineurl = ((Microsoft.Azure.Storage.Blob.CloudBlob)file).SnapshotQualifiedUri.AbsoluteUri;
                        if (filenamepath.IndexOf(".") > 0)
                        {
                            string listItem = string.Format("{0}#{1}#{2}", folderName, filenamepath.Replace(rpath, "").Replace("/", "").Split(".")[0], fineurl);
                            listfles.Add(listItem);
                        }
                    }

                }

                return listfles;
            }
            catch (Exception ex)
            {
                //throw new Exception();
             return  new List<string>();
            }
        }
        public List<string> ListFilesInBlobAsync(string container)
        {
            try
            {
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                string strContainerName = container;
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
                var list = cloudBlobContainer.ListBlobs();
                List<string> listfles = new List<string>();
                foreach (var item in list)
                {
                    listfles.Add(item.Uri.ToString());

                }

                return listfles;
            }
            catch (Exception ex)
            {
                //throw new Exception();
                return new List<string>();

            }
        }
        public async Task<string> UploadFileToBlobAsync(string strFileName, string email, byte[] fileData, string fileMimeType, string container)
        {
            try
            {
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                string strContainerName = container;
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);
                string fileName = this.GenerateFileName(strFileName);

                fileName = string.Format("{0}_{1}", email, fileName);


                if (await cloudBlobContainer.CreateIfNotExistsAsync())
                {
                    await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
                }



                if (fileName != null && fileData != null)
                {
                    CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
                    cloudBlockBlob.Properties.ContentType = fileMimeType;
                    await cloudBlockBlob.UploadFromByteArrayAsync(fileData, 0, fileData.Length);
                    return cloudBlockBlob.Uri.AbsoluteUri;
                }
                return "";
            }
            catch (Exception ex)
            {
                //throw new Exception();
                return "error";
            }
        }



        public string GenerateFileName(string fileName)
        {
            string[] strName = fileName.Split('.');
            string strFileName = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-dd") + "/" + DateTime.Now.ToUniversalTime().ToString("yyyyMMdd\\THHmmssfff") + "." + strName[strName.Length - 1];
            return strFileName;
        }



        public async Task DeleteBlobFileAsync(string fileUrl, string container)
        {
            Uri uriObj = new Uri(fileUrl);
            string BlobName = Path.GetFileName(uriObj.LocalPath);



            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            string strContainerName = container;
            CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);



            string pathPrefix = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-dd") + "/";
            CloudBlobDirectory blobDirectory = cloudBlobContainer.GetDirectoryReference(pathPrefix);
            // get block blob refarence    
            CloudBlockBlob blockBlob = blobDirectory.GetBlockBlobReference(BlobName);



            if (blockBlob.Exists())
            {
                // delete blob from container        
                await blockBlob.DeleteAsync();
            }
        }



        public string UploadFileToBlob(string strFileName, byte[] fileData, string fileMimeType)
        {
            throw new NotImplementedException();
        }




    }
}