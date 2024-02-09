

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Npgsql;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
{
    var connectionString = $"Host=localhost;Port=5432;Database=todoappdatabase;Username=todoapp;Password=1234todoapp;Pooling=true;";

    services.AddDbContext<TodoContext>(options =>
        options.UseNpgsql(connectionString));
 services.AddScoped<ITodoService, TodoService>();
    services.AddControllers();

    services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
            builder => builder.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader());
    });

    services.AddAuthorization();

}


    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors("CorsPolicy");

        app.UseRouting();

        app.UseAuthorization(); 

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
