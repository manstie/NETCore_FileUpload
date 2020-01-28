using System;
using System.IO;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace netcore_fileupload.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileDataController : ControllerBase
    {
        private List<FileData> filesDB = new List<FileData>();

        private readonly ILogger<FileDataController> _logger;

        public FileDataController(ILogger<FileDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet, Route("Files")]
        public IEnumerable<FileData> Get()
        {
            System.Diagnostics.Debug.WriteLine("The get endpoint has been called.");
            if(filesDB.Count > 0)
            {
                return filesDB.ToArray();
            }
            else
            {
                return null;
            }
        }

        [HttpPost, DisableRequestSizeLimit, Route("Add")]
        public IActionResult AddFile()
        {
            System.Diagnostics.Debug.WriteLine("The post endpoint has been called.");
            try
            {
                var formFiles = Request.Form.Files;
                if (formFiles.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }

                foreach (var file in formFiles)
                {
                    var stream = new MemoryStream();
                    file.OpenReadStream().CopyTo(stream);

                    filesDB.Add(new FileData
                    {
                        Filename = file.FileName,
                        UploadTime = DateTime.Now,
                        Bytes = file.Length,
                        SHA1 = HashString.GetSHA1Hash(stream),
                        MD5 = HashString.GetMD5Hash(stream)
                    });
                    System.Diagnostics.Debug.WriteLine("File added: " + file.FileName);
                }

                return Ok();
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
