using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManagement.Api.Data;
using TaskManagement.Api.Dtos.TaskItem;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskItemCreateDto taskDto)
        {
            // Validating the recieved content 
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the user already exists in the DB by his email address
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == taskDto.UserEmail);

            // This user doesn't exists in the DB, create a new one
            if (user == null)
            {
                user = new User
                {
                    FullName = taskDto.UserFullName,
                    Email = taskDto.UserEmail,
                    Phone = taskDto.UserPhone
                };
                _context.Users.Add(user);
            }

            // Creating the new task
            var newTask = new TaskItem
            {
                Title = taskDto.Title,
                Description = taskDto.Description,
                DueDate = taskDto.DueDate,
                Priority = taskDto.Priority,
                User = user 
            };

            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            var readDto = new TaskItemReadDto
            {
                Id = newTask.Id,
                Title = newTask.Title,
                Description = newTask.Description,
                DueDate = newTask.DueDate,
                CreatedAt = newTask.CreatedAt,
                Priority = newTask.Priority.ToString(),
                Status = newTask.Status.ToString(),
                UserFullName = newTask.User.FullName,
                UserEmail = newTask.User.Email,
                UserPhone = newTask.User.Phone
            };

            return Ok(readDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _context.Tasks
                .Include(t => t.User)
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new TaskItemReadDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    Priority = t.Priority.ToString(),
                    CreatedAt = t.CreatedAt,
                    Status = t.Status.ToString(),

                    UserFullName = t.User != null ? t.User.FullName : "Unassigned",
                    UserEmail = t.User != null ? t.User.Email : "",
                    UserPhone = t.User != null ? t.User.Phone : ""
                })
                .ToListAsync();

            return Ok(tasks);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskItemUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await _context.Tasks
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} was not found" });
            }

            try
            {
                task.Title = updateDto.Title;
                task.Description = updateDto.Description;
                task.DueDate = updateDto.DueDate;
                task.Priority = updateDto.Priority;
                task.Status = updateDto.Status;

                await _context.SaveChangesAsync();

                var readDto = new TaskItemReadDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    DueDate = task.DueDate,
                    CreatedAt = task.CreatedAt,
                    Priority = task.Priority.ToString(),
                    Status = task.Status.ToString(),
                    UserFullName = task.User?.FullName ?? "Unknown",
                    UserEmail = task.User?.Email ?? "",
                    UserPhone = task.User?.Phone ?? ""
                };

                return Ok(readDto);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating the task");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound(new { message = $"Task with ID {id} was not found" });
            }

            try
            {
                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the task");
            }

            return NoContent();
        }
    }
}