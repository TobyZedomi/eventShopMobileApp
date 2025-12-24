import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonSearchbar, IonAvatar, IonIcon, } from '@ionic/angular/standalone';
import { SearchType, Event} from 'src/app/services/event';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonSearchbar, IonAvatar, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class EventsPage implements OnInit {


  results: any[] = [];
  searchTerm = '';
  type: SearchType = SearchType.all;


  constructor(private eventService: Event ) { }

  ngOnInit() {
  }

  searchChanged(){
    this.eventService.searchData(this.searchTerm, this.type).subscribe(events => {
      this.results = events;
    });


  }

}