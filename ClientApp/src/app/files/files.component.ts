import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData, FileDataService } from '../shared/filedata.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit {

  private files: FileData[];

  constructor(private http: HttpClient,
              private data: FileDataService,
              @Inject('BASE_URL') private baseUrl: string)
  {
    this.data.currentMessage.subscribe(message => this.files = message);
  }

  ngOnInit()
  {
    
  }
}


