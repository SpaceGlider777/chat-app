using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YappersApi.Migrations
{
    /// <inheritdoc />
    public partial class MessageRoomRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "Messages",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_RoomName",
                table: "Messages",
                column: "RoomName");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ConversationRooms_RoomName",
                table: "Messages",
                column: "RoomName",
                principalTable: "ConversationRooms",
                principalColumn: "RoomName",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ConversationRooms_RoomName",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_RoomName",
                table: "Messages");

            migrationBuilder.AlterColumn<string>(
                name: "RoomName",
                table: "Messages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
