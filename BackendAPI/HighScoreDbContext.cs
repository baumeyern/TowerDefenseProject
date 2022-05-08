using Microsoft.EntityFrameworkCore;

namespace BackendAPI
{
    public class HighScoreDbContext : DbContext
    {
        public DbSet<HighScore> HighScore { get; set; }

        public HighScoreDbContext(DbContextOptions<HighScoreDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HighScore>().ToTable("HighScore");
        }
    }
}