import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface FileData
{
  filename: string;
  uploadTime: Date;
  fileSize: string;
  shA1: string;
  mD5: string;
}

@Injectable()
export class FileDataService
{
  public messageSource = new BehaviorSubject<FileData[]> (null);
  public currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string)
  {
    this.refreshData();
  }

  refreshData()
  {
    this.http.get<FileData[]>(this.baseUrl + 'FileData/Files').subscribe(result =>
    {
      this.messageSource.next(result);
    }, error => console.error("Everything is terrible: " + error));
  }

}
