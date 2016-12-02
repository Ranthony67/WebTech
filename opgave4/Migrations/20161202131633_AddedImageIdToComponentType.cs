using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace opgave4.Migrations
{
    public partial class AddedImageIdToComponentType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "ComponentTypes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "ComponentTypes");
        }
    }
}
