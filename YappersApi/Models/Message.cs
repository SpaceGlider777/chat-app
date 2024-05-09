using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YappersApi.Models
{
    public class Message
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "User name is required")]
        public string? User { get; set; }

        [Required(ErrorMessage = "Room name is required")]
        public string? RoomName { get; set; }
        public virtual ConversationRoom? ConversationRoom { get; set; }

        [Required(ErrorMessage = "Message is empty")]
        public string? Content { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime CreatedDate { get; set; }
    }
}