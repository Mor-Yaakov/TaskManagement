using System.ComponentModel.DataAnnotations;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Dtos.TaskItem
{
    public class TaskItemUpdateDto
    {
        [Required(ErrorMessage = "Task title is required")]
        [StringLength(100, ErrorMessage = "Task title cannot exceed 100 characters")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Task description is required")]
        [StringLength(4000, ErrorMessage = "Task description cannot exceed 4000 characters")]
        public string Description { get; set; } = null!;

        [Required(ErrorMessage = "Task due date is required")]
        public DateTime DueDate { get; set; }

        [Required(ErrorMessage = "Task priority is required")]
        [EnumDataType(typeof(TaskItemPriority))]
        public TaskItemPriority Priority { get; set; } = TaskItemPriority.Medium;

        [EnumDataType(typeof(TaskItemStatus))]
        public TaskItemStatus Status { get; set; } = TaskItemStatus.New;

    }
}