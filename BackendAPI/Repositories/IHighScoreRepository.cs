using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Repositories
{
    public interface IHighScoreRepository
    {
        public void Insert(HighScore highScore);

        public List<HighScore> GetAll();
    }
}