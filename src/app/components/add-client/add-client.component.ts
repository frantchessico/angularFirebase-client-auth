import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  reload = false;
  task: AngularFireUploadTask;
  selectedImage = null;
  previewFile = null;
  constructor(
      private afStorage: AngularFireStorage,
      private clientService: ClientService, 
      private router: Router
    ) { }

  ngOnInit() {
  }

  addClient(form) {
    if(form.valid) {
      this.reload = true
      const image = this.selectedImage;
      const myFile = 'depots/clients/'+image.name;
      
      this.task = this.afStorage.upload(myFile, image);
      const ref = this.afStorage.ref(myFile);
       
      this.task.snapshotChanges().pipe(
        finalize(() => {
          console.log('finalize')
          ref.getDownloadURL().subscribe((downloadURL) => {
              form.value.image = downloadURL;
            this.clientService._persistClient(form.value)
                .then((res) => this.router.navigate(['/']))
                .catch((error) => console.error('i am a catch erro:', error))
          })
        })
      ).subscribe()

      
    }else {
      alert('form invalid')
    }
  }


  previewImage(event) {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => this.previewFile = reader.result;
    reader.readAsDataURL(this.selectedImage)
  }

}
