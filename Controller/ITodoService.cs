using System.Collections.Generic;
using System.Threading.Tasks;

public interface ITodoService
{
    Task<IEnumerable<TaskModel>> GetTasks();
    Task<TaskModel> GetTaskById(int id);
    Task<TaskModel> AddTask(TaskModel task);
    Task<TaskModel> UpdateTask(int id, TaskModel task);
    Task DeleteTask(int id);
}