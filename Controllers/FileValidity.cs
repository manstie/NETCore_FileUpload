using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace netcore_fileupload.Controllers
{
    //https://www.garykessler.net/library/file_sigs.html
    public static class FileValidity
    {
        public static bool isPDF(Stream s)
        {
            return true;
        }
    }
}
