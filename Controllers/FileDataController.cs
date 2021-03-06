﻿using System;
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
        private readonly ILogger<FileDataController> _logger;

        public FileDataController(ILogger<FileDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet, Route("Files")]
        public IEnumerable<FileData> Get()
        {
            System.Diagnostics.Debug.WriteLine("The get endpoint has been called.");
            if (Program.filesDB.Count > 0)
            {
                return Program.filesDB.ToArray();
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
                    Program.filesDB.Add(new FileData
                    {
                        FileName = file.FileName,
                        UploadTime = DateTime.Now,
                        Bytes = file.Length,
                        SHA1 = HashString.GetSHA1Hash(file.OpenReadStream()),
                        MD5 = HashString.GetMD5Hash(file.OpenReadStream())
                    });
                    System.Diagnostics.Debug.WriteLine("File added: " + Program.filesDB[Program.filesDB.Count-1].ToString());
                    System.Diagnostics.Debug.WriteLine("PDF: " + FileValidity.isPDF(file.OpenReadStream()));
                    System.Diagnostics.Debug.WriteLine("DOC: " + FileValidity.isDOC(file.OpenReadStream()));
                    System.Diagnostics.Debug.WriteLine("DOCX: " + FileValidity.isDOCX(file.OpenReadStream()));
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
