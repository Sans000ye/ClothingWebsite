using Microsoft.EntityFrameworkCore;
using ClothingWebsite.Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<QuanAoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5000", "https://localhost:5000",
                "http://localhost:53196", "https://localhost:53196")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:53196")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithExposedHeaders("*");
        });
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
