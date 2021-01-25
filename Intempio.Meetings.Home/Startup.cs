using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using Intempio.Meetings.Home.Util;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using Intempio.Meetings.Home.IServices;
using Intempio.Meetings.Home.Models;
using System.Threading.Tasks;

namespace Intempio.Meetings.Home
{
    public class Startup
    {


        public static TokenValidationParameters tokenValidationParameters;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();
            services.ConfigureWritable<IntempioSettings>(Configuration.GetSection("IntempioSettings"));

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
         .AddJwtBearer(options =>
         {
             options.TokenValidationParameters = tokenValidationParameters;
             options.Events = new JwtBearerEvents()
             {
                 OnAuthenticationFailed = context =>
                 {
                     if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                     {
                         context.Response.Headers.Add("Token-Expired", "true");
                     }
                     return Task.CompletedTask;
                 },
                 OnMessageReceived = async (context) =>
                 {
                     var tokenService = context.HttpContext.RequestServices.GetService<ITokenService>();

                     if (context.Request.Headers.ContainsKey("Authorization"))
                     {
                         var header = context.Request.Headers["Authorization"].FirstOrDefault();
                         if (header.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                         {
                             var token = header.Substring("Bearer".Length).Trim();
                             context.Token = token;
                         }
                     }
                     if (context.Token == null)
                     {
                         return;
                     }
                     else
                     {
                         int userId = tokenService.GetUserIdFromToken(context.Token);
                         bool isValid = false;

                         if (user != null)
                         {
                             isValid = await tokenService.ValidateByToken(context.Token, 1, TokenType.ApplicationToken);
                         }
                         if (isValid == false)
                         {
                             context.Response.Headers.Add("Token-IsActive", "false");
                             context.Fail("not a valid token");
                         }
                     }
                 }
             };
         });


            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();


            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
