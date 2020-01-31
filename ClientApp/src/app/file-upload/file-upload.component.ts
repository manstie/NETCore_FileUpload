import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileData, FileDataService } from '../shared/filedata.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  private err: string;
  private success: boolean;
  private progress: number;

  constructor(private http: HttpClient,
              private data: FileDataService,
              @Inject('BASE_URL') private baseUrl: string)
  {
    this.clearNotifications();
    this.progress = -1;
  }

  ngOnInit() {

  }


//https://code-maze.com/upload-files-dot-net-core-angular/
  selectedFile(files)
  {
    this.clearNotifications();

    if (files.length > 0)
    {
      const formData = new FormData();

      for (let file of files)
      {
        formData.append(file.name, file);
        console.log("Post file: " + file.name);
      }

      this.http.post(this.baseUrl + 'FileData/Add', formData, { reportProgress: true, observe: 'events' }).subscribe(event =>
      {
        if (event.type === HttpEventType.UploadProgress)
        {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if (event.type === HttpEventType.Response)
        {
          this.success = true;
          this.data.refreshData();
          this.progress = -1;
        }
      }, error => console.error("Everything is terrible: " + error));

    }
    else
    {
      this.err = 'No target file'
    }
  }

  clearNotifications()
  {
    this.err = '';
    this.success = false;
  }
}
