using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagement.Api.Controllers;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos.TaskItem;
using TaskManagement.Api.Models;

namespace TaskManagement.Tests
{
    public class TasksControllerTests
    {
        private AppDbContext GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var databaseContext = new AppDbContext(options);
            databaseContext.Database.EnsureCreated();
            return databaseContext;
        }

        private void MockUserContext(TasksController controller, string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, "test@test.com")
            };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = claimsPrincipal }
            };
        }

        [Fact]
        public async Task GetTasks_ReturnsAllTasks()
        {
            var context = GetDatabaseContext();
            var testUser = new User
            {
                Id = 1,
                Email = "test@test.com",
                FullName = "Test User",
                Phone = "0500000000"
            };
            context.Users.Add(testUser);

            context.Tasks.Add(new TaskItem
            {
                Id = 1,
                Title = "Task 1",
                Description = "Description",
                UserId = 1
            });
            await context.SaveChangesAsync();

            var controller = new TasksController(context);
            MockUserContext(controller, "1");

            var result = await controller.GetAllTasks();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var tasks = Assert.IsAssignableFrom<IEnumerable<TaskItemReadDto>>(okResult.Value);
            Assert.NotEmpty(tasks);
        }

        [Fact]
        public async Task CreateTask_InvalidModel_ReturnsBadRequest()
        {
            var context = GetDatabaseContext();
            var controller = new TasksController(context);

            var newTaskDto = new TaskItemCreateDto { Title = "" };

            controller.ModelState.AddModelError("Title", "Required");

            var result = await controller.CreateTask(newTaskDto);

            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task DeleteTask_RemovesTaskFromDatabase()
        {
            var context = GetDatabaseContext();
            var task = new TaskItem
            {
                Id = 10,
                Title = "To Delete",
                Description = "Desc",
                UserId = 1
            };
            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            var controller = new TasksController(context);
            MockUserContext(controller, "1");

            var result = await controller.DeleteTask(10);

            Assert.IsType<NoContentResult>(result);

            var deletedTask = await context.Tasks.FindAsync(10);
            Assert.Null(deletedTask);
        }
    }
}