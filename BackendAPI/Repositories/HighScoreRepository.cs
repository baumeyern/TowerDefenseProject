namespace BackendAPI.Repositories
{
    public class HighScoreRepository : IHighScoreRepository
    {
        private readonly HighScoreDbContext _highScoreDbContext;

        public HighScoreRepository(HighScoreDbContext highScoreDbContext)
        {
            _highScoreDbContext = highScoreDbContext;
        }

        public List<HighScore> GetAll()
        {
            var scores = _highScoreDbContext.HighScore.OrderByDescending(score => score.Score).ToList();
            return scores;
        }

        public void Insert(HighScore highScore)
        {
            _highScoreDbContext.Add(highScore);
            _highScoreDbContext.SaveChanges();
        }
    }
}