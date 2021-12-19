using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SaleDrink.ApplicationAPI.Application;
using SaleDrink.ApplicationAPI.Application.Common.Exceptions;
using SaleDrink.ApplicationAPI.Application.Common.Infrastructure.Hubs;
using SaleDrink.ApplicationAPI.Infrastructure;
using SaleDrink.ApplicationAPI.Persistence;
using SaleDrink.ApplicationAPI.WebAPI.Models.Response;
using System.Reflection;

namespace SaleDrink.ApplicationAPI.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddPersistence(Configuration);
            services.AddInfrastructure(Configuration);
            services.AddApplication();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddControllers();
            services.AddSignalR();

            services.AddCors();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

        

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SaleDrink.ApplicationAPI.WebAPI", Version = "v1" });
                c.CustomSchemaIds(type => type.ToString());
               

            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SaleDrink.ApplicationAPI.WebAPII v1"));
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SaleDrink.ApplicationAPI.WebAPI v1"));
            }

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 200;
                    context.Response.ContentType = "application/json";
                    var exceptionHandlerPathFeature =
                                            context.Features.Get<IExceptionHandlerPathFeature>();

                    var serializerSettings = new Newtonsoft.Json.JsonSerializerSettings();
                    serializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
                    await context.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(
                        new ResponseContract<object>()
                        {
                            Result = false,
                            Error = new ErrorContract()
                            {
                                Message = exceptionHandlerPathFeature?.Error is UserInterfaceException
                                ? $"{((UserInterfaceException)exceptionHandlerPathFeature?.Error)?.UIMessage}"
                                : "Ошибка выполнения запроса",
                                ErrorCode = exceptionHandlerPathFeature?.Error is UserInterfaceException
                                ? $"{((UserInterfaceException)exceptionHandlerPathFeature?.Error)?.Id}"
                                : string.Empty
                            }
                        }, serializerSettings));
                });
            });

            app.UseCors(builder => builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowAnyOrigin()
                            .WithOrigins(Configuration.GetSection("WebUIRootURL")?.Value)
                            .AllowCredentials());
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("api/hubs/Notification");

            });
        }
    }
}
