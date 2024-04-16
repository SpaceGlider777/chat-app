using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YappersApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAssociationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ConversationRooms_ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ConversationRooms_AspNetUsers_UserId",
                table: "ConversationRooms");

            migrationBuilder.DropIndex(
                name: "IX_ConversationRooms_UserId",
                table: "ConversationRooms");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ConversationRooms");

            migrationBuilder.DropColumn(
                name: "ConversationRoomRoomName",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "ConversationRoomUser",
                columns: table => new
                {
                    ConversationRoomsRoomName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConversationRoomUser", x => new { x.ConversationRoomsRoomName, x.UsersId });
                    table.ForeignKey(
                        name: "FK_ConversationRoomUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConversationRoomUser_ConversationRooms_ConversationRoomsRoomName",
                        column: x => x.ConversationRoomsRoomName,
                        principalTable: "ConversationRooms",
                        principalColumn: "RoomName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConversationRoomUser_UsersId",
                table: "ConversationRoomUser",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConversationRoomUser");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "ConversationRooms",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConversationRoomRoomName",
                table: "AspNetUsers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConversationRooms_UserId",
                table: "ConversationRooms",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ConversationRoomRoomName",
                table: "AspNetUsers",
                column: "ConversationRoomRoomName");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ConversationRooms_ConversationRoomRoomName",
                table: "AspNetUsers",
                column: "ConversationRoomRoomName",
                principalTable: "ConversationRooms",
                principalColumn: "RoomName");

            migrationBuilder.AddForeignKey(
                name: "FK_ConversationRooms_AspNetUsers_UserId",
                table: "ConversationRooms",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
