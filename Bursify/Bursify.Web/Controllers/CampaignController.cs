﻿using Bursify.Web.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Bursify.Api.Students;
using Bursify.Web.Utility;
using Bursify.Api.Security;
using System.Web;
using System.IO;
using System.Linq;

namespace Bursify.Web.Controllers
{
    [System.Web.Mvc.RoutePrefix("api/Campaign")]
    public class CampaignController : ApiController
    {
        private readonly StudentApi _studentApi;
        private readonly MembershipApi _membershipApi;

        public CampaignController(MembershipApi memebershipApi, StudentApi studentApi)
        {
            _membershipApi = memebershipApi;
            _studentApi = studentApi;
        }

        //get all campaigns
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetAllCampaigns")]
        public HttpResponseMessage GetAllCampaigns(HttpRequestMessage request) //Get all campaigns
        {
            var campaigns = _studentApi.GetAllCampaigns();

            var campaignVm = CampaignViewModel.MultipleCampaignsMap(campaigns);

            foreach (var c in campaignVm)
            {
                var student = _studentApi.GetStudent(c.StudentId);
                c.Name = student.Firstname;
                c.Surname = student.Surname;
            }

            var response = request.CreateResponse(HttpStatusCode.OK, campaignVm);

            return response;
        }

        //get all campaigns for a user
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetAllCampaigns")]
        public HttpResponseMessage GetAllCampaigns(HttpRequestMessage request, int userId)
        {
            var campaigns = _studentApi.GetAllCampaigns(userId);

            var campaignVm = CampaignViewModel.MultipleCampaignsMap(campaigns);

            foreach (var c in campaignVm)
            {
                var student = _studentApi.GetStudent(c.StudentId);
                c.Name = student.Firstname;
                c.Surname = student.Surname;
            }

            var response = request.CreateResponse(HttpStatusCode.OK, campaignVm);

            return response;
        }

        //get all campaigns meeting user's search criteria
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetAllCampaigns")]
        public HttpResponseMessage GetAllCampaigns(HttpRequestMessage request, string searchCriteria)
        {
            var campaigns = _studentApi.SearchCampaigns(searchCriteria);

            var campaignVm = CampaignViewModel.MultipleCampaignsMap(campaigns);

            foreach (var c in campaignVm)
            {
                var student = _studentApi.GetStudent(c.StudentId);
                c.Name = student.Firstname;
                c.Surname = student.Surname;
            }

            var response = request.CreateResponse(HttpStatusCode.OK, campaignVm);

            return response;
        }

        //get a single campaign
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetCampaign")]
        public HttpResponseMessage GetCampaign(HttpRequestMessage request, int campaignId)
        {
            var campaign = _studentApi.GetSingleCampaign(campaignId);

            var model = new CampaignViewModel(campaign);

            var student = _studentApi.GetStudent(campaign.StudentId);
            model.Name = student.Firstname;
            model.Surname = student.Surname;

            var campaignVm = model.SingleCampaignMap(campaign);

            var response = request.CreateResponse(HttpStatusCode.OK, campaignVm);

            return response;
        }

        //get a single campaign for a user
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetCampaign")]
        public HttpResponseMessage GetCampaign(HttpRequestMessage request, int campaignId, int userId)
        {
            var campaign = _studentApi.GetSingleCampaign(campaignId, userId);

            var model = new CampaignViewModel(campaign);

            var student = _studentApi.GetStudent(campaign.StudentId);
            model.Name = student.Firstname;
            model.Surname = student.Surname;

            model.SingleCampaignMap(campaign);

            var response = request.CreateResponse(HttpStatusCode.OK, model);

            return response;
        }

        // add a new campaign or update an already existing one
        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpPost]
        [System.Web.Mvc.Route("SaveCampaign")]
        public HttpResponseMessage SaveCampaign(HttpRequestMessage request, CampaignViewModel campaign)
        {
            var newCampaign = campaign.ReverseMap();

            _studentApi.SaveCampaign(newCampaign);

            var campaignVm = new CampaignViewModel(newCampaign);

            var student = _studentApi.GetStudent(campaignVm.StudentId);

            campaignVm.Name = student.Firstname;

            campaignVm.Surname = student.Surname ;

            var response = request.CreateResponse(HttpStatusCode.Created, campaignVm);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpPut]
        [System.Web.Mvc.Route("RemoveCampaign")]
        public HttpResponseMessage RemoveCampaign(HttpRequestMessage request, int campaignId)
        {
            var campaign = _studentApi.GetSingleCampaign(campaignId);

            campaign.Status = "Inactive";

            _studentApi.SaveCampaign(campaign);

            var response = request.CreateResponse(HttpStatusCode.Accepted);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetCampaignAccount")]
        public HttpResponseMessage GetCampaignAccount(HttpRequestMessage request, int campaignId)
        {
            var account = _studentApi.GetCampaignAccount(campaignId);

            var accountVm = new AccountViewModel(account);

            var response = request.CreateResponse(HttpStatusCode.OK, accountVm);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpPost]
        [System.Web.Mvc.Route("SaveCampaignAccount")]
        public HttpResponseMessage SaveCampaignAccount(HttpRequestMessage request, AccountViewModel account)
        {
            var newAccount = account.ReverseMap();

            _studentApi.SaveCampaignAccount(newAccount);

            var response = request.CreateResponse(HttpStatusCode.Created, account);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpPost]
        [System.Web.Mvc.Route("EndorseCampaign")]
        public HttpResponseMessage EndorseCampaign(HttpRequestMessage request,int userId, int campaignId)
        {
            var campaign = _studentApi.EndorseCampaign(userId, campaignId);

            CampaignViewModel campaignVM = new CampaignViewModel();
            campaignVM.SingleCampaignMap(campaign);

            var response = request.CreateResponse(HttpStatusCode.OK, campaignVM);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.HttpGet]
        [System.Web.Mvc.Route("GetNumberCampaignsByStudent")]
        public HttpResponseMessage GetNumberCampaignsByStudent(HttpRequestMessage request, int Id)
        {
            int number = _studentApi.GetNumberOfCampaignsByID(Id);

            var response = request.CreateResponse(HttpStatusCode.OK, number);

            return response;
        }

        [System.Web.Mvc.AllowAnonymous]
        [System.Web.Mvc.Route("UploadImage")]
        [MimeMultipart]
        public HttpResponseMessage UploadImage(HttpRequestMessage request, int userId, int campaignId)
        {
            var user = _membershipApi.GetUserById(userId);

            if (user == null) return null;

            var imagePath = HttpContext.Current.Server.MapPath("~/Content/BursifyUploads/" + userId + "/images");

            var directory = new DirectoryInfo(imagePath);

            if (!directory.Exists) { directory.Create(); }

            var multipartFormDataStreamProvider = new UploadMultipartFormProvider(directory.FullName);

            // Read the MIME multipart asynchronously 
            Request.Content.ReadAsMultipartAsync(multipartFormDataStreamProvider);

            var localFileName = multipartFormDataStreamProvider
                .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();

            // Create response
            if (localFileName == null) return null;
            var fileUploadResult = new FileUploadResult
            {
                LocalFilePath = localFileName,
                FileName = Path.GetFileName(localFileName),
                FileLength = new FileInfo(localFileName).Length
            };

            var campaign = _studentApi.GetSingleCampaign(campaignId, userId);

            campaign.PicturePath = fileUploadResult.FileName;

            _studentApi.SaveCampaign(campaign);

            var response = request.CreateResponse(HttpStatusCode.OK, fileUploadResult);

            return response;
        }
    }
}