import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  admin: boolean;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getAdmin();
  }

  ngOnChanges(){
    this.getAdmin();
  }
  getAdmin(): void{
     const adm = this.route.snapshot.paramMap.get('adm');
     if(adm == 'true'){
      this.admin = true;
     } else{
       this.admin = false;
     }
  }

}
