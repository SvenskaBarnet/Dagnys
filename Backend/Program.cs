using Newtonsoft.Json.Serialization;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add db context
builder.Services.AddDbContext<DagnysContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//JSON Serializer
builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore).AddNewtonsoftJson(options =>
    options.SerializerSettings.ContractResolver = new DefaultContractResolver()); 

var app = builder.Build();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var service =  scope.ServiceProvider;
    
    try
    {
        SeedData.Initialize(service);
    }
    catch (Exception ex)
    {
        var logger = service.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the DB.");
    }
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
