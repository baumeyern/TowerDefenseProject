namespace BackendAPI.Repositories
{
    public class HighScoreRepository : IHighScoreRepository
    {
        private readonly HighScoreDbContext _highScoreDbContext;

        public HighScoreRepository(HighScoreDbContext highScoreDbContext)
        {
            _highScoreDbContext = highScoreDbContext;
        }

        //Requirement 12.0.3
        public List<HighScore> GetAll()
        {
            var scores = _highScoreDbContext.HighScore.OrderByDescending(score => score.Score).ToList();
            return scores;
        }
        //Requirement 12.0.4
        public void Insert(HighScore highScore)
        {
            _highScoreDbContext.Add(highScore);
            _highScoreDbContext.SaveChanges();
        }
    }
}