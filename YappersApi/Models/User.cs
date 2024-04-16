using Microsoft.AspNetCore.Identity;

namespace YappersApi.Models
{
    public class User : IdentityUser
    {
        public virtual ICollection<ConversationRoom> ConversationRooms { get; set; }
    }
}