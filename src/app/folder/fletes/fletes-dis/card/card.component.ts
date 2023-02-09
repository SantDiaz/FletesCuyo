import { Component, OnInit } from '@angular/core';
import { DatosFlete } from 'src/app/folder/models/models';
import { FirestoreService } from 'src/app/folder/services/firestore.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  filter: string = "filtro";
  fletes: DatosFlete[] = []
  constructor(private db: FirestoreService,
    ) { }

  ngOnInit() {

    this.getItems();
  }

    // getItems(){
  //   const enlace = 'PedirFlete'; 
  //   this.db.getCollection<DatosFlete>(enlace).subscribe({
  //     next: (data : any) => {
  //       console.log("estoyenget")
  //      this.fletes = data.results;
  //     console.log(data.results);
  //   },
  //   error: (err) =>{
  //     console.log(err);
  //   }
  //   })
  // }

  getItems() {
    const enlace = 'PedirFlete'; 
    this.db.getCollection<DatosFlete>(enlace).subscribe(res => {
      this.fletes = res;
    });
  }
}
