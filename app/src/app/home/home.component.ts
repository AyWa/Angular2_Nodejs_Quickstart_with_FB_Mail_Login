import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../service_utilisateurs/profil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private profilService: ProfilService) { }

  ngOnInit() {
  }

  yolo(){
    this.profilService.handleSomething().subscribe((result) => {
      if(result) console.log(result);
    });
  }
}
