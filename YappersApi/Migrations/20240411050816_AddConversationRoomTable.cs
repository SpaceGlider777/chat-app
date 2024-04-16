using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YappersApi.Migrations
{
    /// <inheritdoc />
    public partial class AddConversationRoomTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConversationRoomRoomName",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUsers",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ConversationRooms",
                columns: table => new
                {
                    RoomName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConversationRooms", x => x.RoomName);
                    table.ForeignKey(
                        name: "FK_ConversationRooms_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ConversationRoomRoomName",
                table: "AspNetUsers",
                column: "ConversationRoomRoomName");

            migrationBuilder.CreateIndex(
                name: "IX_ConversationRooms_UserId",
                table: "ConversationRooms",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ConversationRooms_ConversationRoomRoomName",
                table: "AspNetUsers",
                column: "ConversationRoomRoomName",
                principalTable: "ConversationRooms",
                principalColumn: "RoomName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ConversationRooms_ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "ConversationRooms");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUsers");
        }
    }
}
