using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using YappersApi.Hubs;

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
    }
}