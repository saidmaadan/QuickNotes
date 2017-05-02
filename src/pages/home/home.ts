import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,Platform } from 'ionic-angular';
import { QuicknoteModel } from '../../models/quicknote-model';
import { Data } from '../../providers/data';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  quicknotes: QuicknoteModel[] = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public dataService: Data,
    public platform: Platform,
    public keyboard: Keyboard
  ) {

  }
  ionViewDidLoad(){}

  addQuicknote(): void{
    let prompt = this.alertCtrl.create({
      title: 'New Quicknote',
      message: 'Enter the title of your new note',
        inputs:[
          {
            name:'name'
          }
        ],
        buttons:[
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
            let newQuicknote = new QuicknoteModel(data.name, []);
            this.quicknotes.push(newQuicknote);
            newQuicknote.quicknoteUpdates().subscribe(update => {
              this.save();
            });
            this.save();
          }
        }
      ]
    });
    prompt.present();
  }

  renameQuicknote(quicknote): void{
    let prompt = this.alertCtrl.create({
      title: 'Rename Note',
      message: 'Enter new name for your note',
      inputs:[
        {
          name: 'name'
        }
      ],
      buttons:[
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data =>{
            let index = this.quicknotes.indexOf(quicknote);
            if(index > -1){
              this.quicknotes[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]

    });
    prompt.present();
  }

  viewQuicknote(quicknote): void{
    this.navCtrl.push('Quicknote', {
      quicknote: quicknote
    })
  }

  removeQuicknote(quicknote): void{
    let index = this.quicknotes.indexOf(quicknote);
    if(index > -1){
      this.quicknotes.splice(index, 1);
      this.save();
    }
  }

  save(): void{}

}
