using System.ComponentModel.DataAnnotations;

namespace YappersApi.Models
{
    public class ConversationRoom
    {
        [Key]
        public string RoomName { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}