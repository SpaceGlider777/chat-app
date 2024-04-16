using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YappersApi.Auth;
using YappersApi.Models;

namespace YappersApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversationRoomController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ConversationRoomController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConversationRoom>>> GetAllRooms()
        {
            return await _context.ConversationRooms.ToListAsync();
        }

        [HttpGet("{roomName}")]
        public async Task<ActionResult<ConversationRoom>> GetRoom(string roomName)
        {
            var room = await _context.ConversationRooms.FindAsync(roomName);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        [HttpPost]
        public async Task<ActionResult<ConversationRoom>> AddRoom([FromBody] ConversationRoom room)
        {
            if (room == null)
            {
                return BadRequest();
            }

            _context.ConversationRooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { roomName = room.RoomName }, room);
        }

        [HttpDelete("{roomName}")]
        public async Task<ActionResult<ConversationRoom>> DeleteRoom(string roomName)
        {
            var room = await _context.ConversationRooms.FindAsync(roomName);

            if (room == null)
            {
                return NotFound();
            }

            _context.ConversationRooms.Remove(room);
            await _context.SaveChangesAsync();

            return room;
        }
    }
}