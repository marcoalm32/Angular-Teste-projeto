import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { People } from './people';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  peopleCollection: AngularFirestoreCollection<People> = this.afs.collection('people');

  constructor(
    private afs: AngularFirestore
  ) { }

  getPeople() : Observable<People[]> {
    return this.peopleCollection.valueChanges();
  }

  register(p: People) {
    p.id = this.afs.createId();
    return this.peopleCollection.doc(p.id).set(p);
  }

  delete(p: People) {
    return this.peopleCollection.doc(p.id).delete();
  }

  update(p: People) {
    return this.peopleCollection.doc(p.id).set(p);
  }
  
}
