namespace ClothingWebsite.Server.Models.Converter
{
    public class CTaiKhoan
    {
        public string MaTaiKhoan { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int QuyenTaiKhoan { get; set; }
    }
}
