using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClothingWebsite.Server.Migrations
{
    /// <inheritdoc/>
    public partial class inital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    account_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false),
                    password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    user_power = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Account__46A222CDB5ED18D8", x => x.account_id);
                });

            migrationBuilder.CreateTable(
                name: "Product_Color",
                columns: table => new
                {
                    color_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    color = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product___1143CECB0643E4DA", x => x.color_id);
                });

            migrationBuilder.CreateTable(
                name: "Product_Type",
                columns: table => new
                {
                    type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_type = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product___2C000598F70CF72F", x => x.type_id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    type_id = table.Column<int>(type: "int", nullable: false),
                    color_id = table.Column<int>(type: "int", nullable: false),
                    amount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product__47027DF5C3785C2E", x => x.product_id);
                    table.ForeignKey(
                        name: "FK__Product__color_i__4D94879B",
                        column: x => x.color_id,
                        principalTable: "Product_Color",
                        principalColumn: "color_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Product__type_id__4CA06362",
                        column: x => x.type_id,
                        principalTable: "Product_Type",
                        principalColumn: "type_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Customer_Product",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__8915EC5AEBEDB9CB", x => new { x.customer_id, x.product_id });
                    table.ForeignKey(
                        name: "FK__Customer___custo__5165187F",
                        column: x => x.customer_id,
                        principalTable: "Account",
                        principalColumn: "account_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Customer___produ__52593CB8",
                        column: x => x.product_id,
                        principalTable: "Product",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Account__F3DBC5729A2E0E73",
                table: "Account",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customer_Product_product_id",
                table: "Customer_Product",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_color_id",
                table: "Product",
                column: "color_id");

            migrationBuilder.CreateIndex(
                name: "IX_Product_type_id",
                table: "Product",
                column: "type_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Product___900DC6E9F1FAD0A5",
                table: "Product_Color",
                column: "color",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Product___D1B20C68BE5AC269",
                table: "Product_Type",
                column: "product_type",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer_Product");

            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Product_Color");

            migrationBuilder.DropTable(
                name: "Product_Type");
        }
    }
}
