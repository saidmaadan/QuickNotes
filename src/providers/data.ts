import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
  // quicknotes: Quicknote[];
  constructor(public storage: Storage) {

  }
  getData(): Promise<any>{
    return this.storage.get('quicknotes');
  }

  save(data): void{
    let saveData = [];
    data.forEach((quicknote)=>{
      saveData.push({
        title: quicknote.title,
        items: quicknote.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('quicknotes', newData);
  }

}
