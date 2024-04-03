using System.ComponentModel.DataAnnotations;

namespace YappersApi.Models
{
    public class Message
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? User { get; set; }
        [Required(ErrorMessage = "Message is empty")]
        public string? Content { get; set; }
    }
}