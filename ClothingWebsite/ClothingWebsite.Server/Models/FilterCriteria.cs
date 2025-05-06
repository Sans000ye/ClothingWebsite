namespace ClothingWebsite.Server.Models
{
    public class FilterCriteria
    {
        public string Type { get; set; } = "";
        public decimal MinPrice { get; set; } = 0;
        public decimal MaxPrice { get; set; } = 300;
        public string Style { get; set; } = "";
        public string Size { get; set; } = "";
        public string Color { get; set; } = "";
    }
}
