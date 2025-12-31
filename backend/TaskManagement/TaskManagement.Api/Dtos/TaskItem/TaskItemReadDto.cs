using System.ComponentModel.DataAnnotations;
using TaskManagement.Api.Dtos.UserDetails;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Dtos.TaskItem
{
    public class TaskItemReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Priority { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string UserFullName { get; set; } = null!;
        public string UserEmail { get; set; } = null!;
        public string UserPhone { get; set; } = null!;
    }
}
