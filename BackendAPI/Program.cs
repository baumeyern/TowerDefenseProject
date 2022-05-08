using BackendAPI;
using BackendAPI.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Requirement 12.0.7
builder.Services.AddScoped<IHighScoreRepository, HighScoreRepository>();

//Requirement 12.0.8
builder.Services.AddDbContext<HighScoreDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("HighScoreDbConnectionString")));

//Requirement 12.0.9
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
