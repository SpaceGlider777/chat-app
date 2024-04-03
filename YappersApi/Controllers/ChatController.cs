using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using YappersApi.Hubs;
using YappersApi.Models;

namespace YappersApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> chatHub;

        public ChatController(IHubContext<ChatHub> _chatHub)
        {
            chatHub = _chatHub;
        }

        [HttpPost]
        public async Task SendMessage([FromBody] Message message)
        {
            await chatHub.Clients.All.SendAsync("ReceiveMessage", message.User, message.Content);
        }
    }
}