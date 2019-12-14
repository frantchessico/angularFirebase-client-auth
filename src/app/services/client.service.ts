import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = afs.collection('users');
   }

  _getClients() {
    return this.clientCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  _persistClient(data) {
    return this.clientCollection.add(data);
  }

  _deleteClient(id) {
    return this.clientCollection.doc(id).delete();
  }

  setStatus(data, id) {
    return this.clientCollection.doc(id).update(data);
  }

  _getClient(id) {
    return this.clientCollection.doc(id).valueChanges();
  }

  _updateClient(client) {
   return this.clientCollection.doc(client.id).update(client);
  }
}
