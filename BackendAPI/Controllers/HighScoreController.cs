using BackendAPI.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    [ApiController]
    public class HighScoreController : ControllerBase
    {
        private readonly IHighScoreRepository _highScoreRepository;

        public HighScoreController(IHighScoreRepository highScoreRepository)
        {
            _highScoreRepository = highScoreRepository;
        }

        //Requirement 12.0.0
        /// <summary>
        /// Returns top 10 scores for display
        /// </summary>
        /// <returns></returns>
        [EnableCors("AllowCors")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<HighScore>> GetAll()
        {
            var list = Ok(_highScoreRepository.GetAll().OrderByDescending(score => score.Score).Take(10));
            return list;
        }

        //Requirement 12.0.1
        /// <summary>
        /// Inserts a new score
        /// </summary>
        /// <param name="name"></param>
        /// <param name="score"></param>
        /// 
        [EnableCors("AllowCors")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult Insert(HighScoreRequest request)
        {
            _highScoreRepository.Insert(new HighScore() { Name = request.Name, Score = int.Parse(request.Score), Date = DateTime.Now, Id = Guid.NewGuid() });
            return Ok();
        }
    }
}