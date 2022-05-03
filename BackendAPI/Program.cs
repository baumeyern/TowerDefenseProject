using BackendAPI;
using BackendAPI.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IHighScoreRepository, HighScoreRepository>();

builder.Services.AddDbContext<HighScoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("HighScoreDbConnectionString")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCors",
        policy =>
        {
            policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
        });
});

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
