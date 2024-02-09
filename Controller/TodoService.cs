using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class TodoService : ITodoService
{
    private readonly TodoContext _context;

    public TodoService(TodoContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TaskModel>> GetTasks()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskModel> GetTaskById(int id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task<TaskModel> AddTask(TaskModel task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskModel> UpdateTask(int id, TaskModel task)
    {
        var existingTask = await _context.Tasks.FindAsync(id);
        if (existingTask != null)
        {
            existingTask.Name = task.Name;
            existingTask.IsCompleted = task.IsCompleted;
            await _context.SaveChangesAsync();
        }
        return existingTask;
    }

    public async Task DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }
}