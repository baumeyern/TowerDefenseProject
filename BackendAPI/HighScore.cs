namespace BackendAPI
{
    public class HighScore
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }

        public int? Score { get; set; }

        public DateTime Date { get; set; }
    }
}