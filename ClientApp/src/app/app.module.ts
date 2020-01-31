import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilesComponent } from './files/files.component';
import { FileDataService } from './shared/filedata.service';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FileUploadComponent,
    FilesComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'upload', component: FileUploadComponent },
      { path: 'files', component: FilesComponent },
    ])
  ],
  providers: [FileDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
