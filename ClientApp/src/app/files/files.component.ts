import { Component, OnInit, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData } from '../shared/filedata';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit {

  private files: FileData[];

  constructor(private http: HttpClient,
              private _ngZone: NgZone,
              @Inject('BASE_URL') private baseUrl: string)
  {

  }

  ngOnInit()
  {
    this.refreshData();
  }

  refreshData()
  {
    console.log("Before: " + this.files);
    this.http.get<FileData[]>(this.baseUrl + 'FileData/Files').subscribe(result =>
    {
      this.files = result;
      console.log(this.files);
    }, error => console.error("Everything is terrible: " + error));

    console.log("After: " + this.files);
  }

  /*
  async refreshData()
  {
    const data = await this.http.get<FileData[]>(this.baseUrl + 'FileData/Files').toPromise();
    this.files = data;
    console.log(data);
  }*/

}


