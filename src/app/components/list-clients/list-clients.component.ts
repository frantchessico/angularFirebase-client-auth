import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  total = 0;
  search = '';
  users: Client[] = [];
  clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService._getClients()
        .subscribe((res: Client[]) => {
           this.users = this.clients = res;
           this.calculTotal();
        });
  }

  searchClient() {
   // tslint:disable-next-line: max-line-length
   this.users = _.filter(this.clients, (client) => _.includes(client.email, this.search) || _.includes(client.firstName, this.search) || _.includes(client.lastName, this.search));
  }

  deleteClient(id) {
    this.clientService._deleteClient(id)
        .then(() => console.log('ok'))
        .catch((err) => console.error(err));
  }

  toggleStatus(client) {

    this.clientService.setStatus({
      active: !client.active
    }, client.id).then((res) => console.log(res))
                 .catch((err) => console.error(err));
  }


  calculTotal() {
   this.total =  _.reduce(this.users, (sum, client) => {
      return sum + client.balance;
    }, 0);
  }

}
