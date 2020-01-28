import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  private err: string;
  private success: boolean;
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.baseUrl = baseUrl;
    this.clearNotifications();
  }

  ngOnInit() {

  }

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
      //todo: report progress? report error during post?
      this.http.post(this.baseUrl + 'FileData/Add', formData).subscribe(result =>
      {
        console.log("Post: " + result);
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
