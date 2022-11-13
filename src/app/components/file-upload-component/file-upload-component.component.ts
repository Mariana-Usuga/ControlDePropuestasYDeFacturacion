import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.css']
})
export class FileUploadComponentComponent implements OnInit {

  file = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
}

onFileSelected() {
  const file = this.file;
console.log('file', file)
  if (file) {
      //this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);

      this.http.post<any>("http://localhost:8080/proposal/upload", formData).subscribe(
        (res) => {
          console.log('res', res)
        },
        (err) => {
          console.log('err', err)
        }
      )

  }
}



}
