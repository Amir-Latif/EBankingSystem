using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            string adminRoleId = Guid.NewGuid().ToString();
            string admineUserId = Guid.NewGuid().ToString();

            // Define Roles
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[] { adminRoleId, "admin", "ADMIN", Guid.NewGuid().ToString() });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[] { Guid.NewGuid().ToString(), "customer", "CUSTOMER", Guid.NewGuid().ToString() });

            // Seed Admin User
            migrationBuilder.InsertData(
                    table: "AspNetUsers",
                    columns: new[] {
                    "Id", "Name", "Status", "Address", "City", "Country", "PostalCode", "CreationDate", "UserName",
                    "NormalizedUserName","Email", "NormalizedEmail", "EmailConfirmed",
                    "PasswordHash",
                    "SecurityStamp", "ConcurrencyStamp",
                    "PhoneNumber", "PhoneNumberConfirmed",
                    "TwoFactorEnabled", "LockoutEnd","LockoutEnabled", "AccessFailedCount"
                    },
                    values: new object[] {
                    admineUserId, "Admin", "Active", "Cairo", "Cairo", "Egypt", "12345", DateTime.UtcNow, "admin@ebanking.com",
                    "ADMIN@EBANKING.COM","admin@ebanking.com","ADMIN@EBANKING.COM", true,
                    "AQAAAAEAACcQAAAAENDvDK8Ux+xOSqdrVgh7s5lXb5fC+ZUC1/pR4t15hVQI3Id7HegW0u608QAyDigVUA==",
                    "H4USNIM7DRSIPK2CTYHUCBOLTQUAQE5K", Guid.NewGuid().ToString(),
                    "01234567890", true, false, null, false, 0
                    });

            migrationBuilder.InsertData(
                    table: "AspNetUserRoles",
                    columns: new[] {
                    "UserId", "RoleId"
                    },
                    values: new object[] {
                    admineUserId,  adminRoleId
                    });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [ROLES]");
            migrationBuilder.Sql("DELETE FROM [USERROLES]");
            migrationBuilder.Sql("DELETE FROM [USERS]");
        }
    }
}
