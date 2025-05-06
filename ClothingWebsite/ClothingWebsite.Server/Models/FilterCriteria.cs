namespace ClothingWebsite.Server.Models
{
    public class FilterCriteria
    {
        public string Style { get; set; }
        public string Size { get; set; }
        public string Type { get; set; }
        public string Color { get; set; }
        public int[] PriceRange { get; set; } // Assuming price range is an array with two elements [min, max]
    }
}
