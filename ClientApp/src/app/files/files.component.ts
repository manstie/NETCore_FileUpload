import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData } from '../shared/filedata';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit {

  public files: FileData[];
  private baseUrl: string;
  private http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  ngOnInit()
  {
    this.refreshData();
  }

  refreshData()
  {
    this.http.get<FileData[]>(this.baseUrl + 'FileData/Files').subscribe(result =>
    {
      this.files = result;
      console.log(this.files);
    }, error => console.error("Everything is terrible: " + error));
  }

}


