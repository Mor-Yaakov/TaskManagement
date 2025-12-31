using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = null!;

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime DueDate { get; set; }
        
        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public TaskItemPriority Priority { get; set; } = TaskItemPriority.Medium;

        public TaskItemStatus Status { get; set; } = TaskItemStatus.New; 

        [Required]
        public int UserId { get; set; }
        public User User { get; set; } = null!;

    }
}
