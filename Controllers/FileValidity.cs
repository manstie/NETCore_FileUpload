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
            try
            {
                s.Seek(0, SeekOrigin.Begin);
                byte[] pdfHeader = new byte[] { 0x25, 0x50, 0x44, 0x46 };
                byte[] thisFile = new byte[4];
                s.Read(thisFile, 0, 4);
                return pdfHeader.SequenceEqual(thisFile);
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool isDOC(Stream s)
        {
            try
            {
                //[512 (0x200) byte offset]
                s.Seek(512, SeekOrigin.Begin);
                byte[] docHeader = new byte[] { 0xEC, 0xA5, 0xC1, 0x00 };
                byte[] thisFile = new byte[4];
                s.Read(thisFile, 0, 4);
                return docHeader.SequenceEqual(thisFile);
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool isDOCX(Stream s)
        {
            try
            {
                s.Seek(0, SeekOrigin.Begin);
                byte[] docxHeader = new byte[] { 0x50, 0x4B, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00 };
                byte[] thisFile = new byte[8];
                s.Read(thisFile, 0, 8);
                return docxHeader.SequenceEqual(thisFile);
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
