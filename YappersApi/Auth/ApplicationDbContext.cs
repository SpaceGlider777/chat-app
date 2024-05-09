using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using YappersApi.Models;

namespace YappersApi.Auth
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {
        }

        public DbSet<ConversationRoom> ConversationRooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ConversationRoom>()
                .HasMany(e => e.Messages)
                .WithOne(e => e.ConversationRoom)
                .HasForeignKey(e => e.RoomName)
                .HasPrincipalKey(e => e.RoomName);

            builder.Entity<Message>()
                .Property(e => e.CreatedDate)
                .HasDefaultValueSql("getdate()");
        }
    }
}