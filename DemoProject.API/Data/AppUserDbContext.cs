using DemoProject.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoProject.API.Data
{
    public class AppUserDbContext : DbContext
    {
        public AppUserDbContext(DbContextOptions<AppUserDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; } = null!;
    }
}
