using Application.ActivityPhotos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivityPhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddActivityPhoto([FromForm] AddActivityPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivityPhoto(string id, string activityId)
        {
            return HandleResult(await Mediator.Send(new DeleteActivityPhoto.Command { Id = id , ActivityId = activityId}));
        }

        [HttpPost("{id}/setMainActivityPhoto")]
        public async Task<IActionResult> SetMainActivityPhoto(string id, string activityId)
        {
            return HandleResult(await Mediator.Send(new SetMainActivityPhoto.Command { Id = id, ActivityId = activityId }));
        }
    }
}