using Microsoft.AspNetCore.SignalR;

namespace YappersApi.Hubs
{
    public class ChatHub : Hub
    {
        public static Dictionary<string, string> groupConnections = new Dictionary<string, string>();

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (groupConnections.ContainsKey(Context.ConnectionId))
            {
                string groupName = groupConnections[Context.ConnectionId];
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
                groupConnections.Remove(Context.ConnectionId);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendGroupMessage(string user, string message)
        {
            if (groupConnections.ContainsKey(Context.ConnectionId))
            {
                string groupName = groupConnections[Context.ConnectionId];
                await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
            }
        }

        public async Task JoinGroup(string groupName)
        {
            // Remove user from current group
            if (groupConnections.ContainsKey(Context.ConnectionId))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupConnections[Context.ConnectionId]);
                groupConnections.Remove(Context.ConnectionId);
            }
            // Broadcast to all that a new group is created
            if (!groupConnections.ContainsValue(groupName))
            {
                await Clients.All.SendAsync("NewGroup", groupName);
            }
            groupConnections.Add(Context.ConnectionId, groupName);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
    }
}