import { Component, OnInit } from '@angular/core';
import { DatosFlete } from '../../models/models';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-fletes-dis',
  templateUrl: './fletes-dis.component.html',
  styleUrls: ['./fletes-dis.component.scss'],
})
export class FletesDisComponent implements OnInit {

  filter: string = "PedirFlete";
  fletes: DatosFlete[] = []
  constructor(
    private db: FirestoreService,
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
