using System.ComponentModel.DataAnnotations;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Dtos.TaskItem
{
    public class TaskItemCreateDto
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

        [Required(ErrorMessage = "User's full name is required")]
        [StringLength(100, ErrorMessage = "User's full name cannot exceed 100 characters")]
        public string UserFullName { get; set; } = null!;

        [Required(ErrorMessage = "User's email address is required")]
        [EmailAddress(ErrorMessage = "User's email is not valid")]
        [StringLength(150, ErrorMessage = "Email cannot exceed 150 characters")]
        public string UserEmail { get; set; } = null!;

        [Required(ErrorMessage = "User's phone number is required")]
        [Phone(ErrorMessage = "User's phone number is not valid")]
        [StringLength(20, ErrorMessage = "Phone number cannot exceed 20 characters")]
        public string UserPhone { get; set; } = null!;

    }
}
