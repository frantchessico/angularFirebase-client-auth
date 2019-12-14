import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  client: Client = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    balance: 0,
    active: false
  }
  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientService) { }
  id = "";
  ngOnInit() {
    this.id = this.route.snapshot.params.idclient;
    this.clientService._getClient(this.id)
        .subscribe((res: Client) => this.client = res)
  }


  updateClient(f) {
    if(f.valid) {
      this.client.id = this.id;
      this.clientService._updateClient(this.client)
          .then(() => this.router.navigate(['/']))
          .catch(err => console.error(err))
    }
  }

  

}
