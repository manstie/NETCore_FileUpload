using System;

namespace netcore_fileupload
{
    public class FileData
    {
        //see https://en.wikipedia.org/wiki/Orders_of_magnitude_(data)
        private readonly string[] sizes = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };

        public string Filename { get; set; }

        public DateTime UploadTime { get; set; }

        public long Bytes { get; set; }

        public string FileSize
        {
            get
            {
                long size = Bytes;
                int order = Math.Min(8, (int)Math.Floor(Math.Log(size, 1024.0)));
                for(int i = 0; i < order; i++)
                {
                    size /= 1024;
                }
                return String.Format("{0:0.##} {1}", size, sizes[order]);
            }
        }

        public string SHA1 { get; set; }

        public string MD5 { get; set; }
    }
}
