using BackendAPI.Controllers;
using BackendAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace BackendAPI.Test
{
    public class HighScoreControllerTest
    {
        private HighScoreController _controller;
        private List<HighScore> _highScores;

        public HighScoreControllerTest()
        {
            _highScores = new List<HighScore>() { new HighScore(), new HighScore() };
        }

        //Test #5
        [Fact]
        public void GetAllTest()
        {
            //Setup
            var mockRepository = new Mock<IHighScoreRepository>();
            mockRepository.Setup(x => x.GetAll()).Returns(_highScores);
            _controller = new HighScoreController(mockRepository.Object);

            //Act
            var results = _controller.GetAll();

            //Assert
            Assert.IsType<OkObjectResult>(results.Result);

            var list = results.Result as OkObjectResult;

            var listScores = list.Value as IEnumerable<HighScore>;

            Assert.Equal(2, listScores.Count());
        }
    }
}