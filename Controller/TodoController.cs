using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/tasks")]
[ApiController]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
    {
        var tasks = await _todoService.GetTasks();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskModel>> GetTask(int id)
    {
        var task = await _todoService.GetTaskById(id);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskModel>> AddTask(TaskModel task)
    {
        var addedTask = await _todoService.AddTask(task);
        return CreatedAtAction(nameof(GetTask), new { id = addedTask.Id }, addedTask);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskModel>> UpdateTask(int id, TaskModel task)
    {
        var updatedTask = await _todoService.UpdateTask(id, task);
        return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(int id)
    {
        await _todoService.DeleteTask(id);
        return NoContent();
    }
}