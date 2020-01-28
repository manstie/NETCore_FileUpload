import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FilesComponent } from '../files/files.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  private err: string;
  private success: boolean;

  constructor(private http: HttpClient,
              private filesTable: FilesComponent,
              private _ngZone: NgZone,
              @Inject('BASE_URL') private baseUrl: string)
  {
    this.clearNotifications();
  }

  ngOnInit() {

  }

  async selectedFile(files)
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
      //todo: report progress? report error during post?
      await this.http.post(this.baseUrl + 'FileData/Add', formData).toPromise();
      this.success = true;
      await this.filesTable.refreshData();
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