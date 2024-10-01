using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;
public class DagnysContext : DbContext
{
    public DbSet<ProductModel> Products { get; set; }
    public DagnysContext(DbContextOptions<DagnysContext> options) : base(options)
    {
    }
}