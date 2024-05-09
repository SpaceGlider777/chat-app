using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace YappersApi.Models
{
    public class ConversationRoom
    {
        [Key]
        public string? RoomName { get; set; }
        
        public virtual ICollection<User>? Users { get; set; }

        [JsonIgnore]
        public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
    }
}