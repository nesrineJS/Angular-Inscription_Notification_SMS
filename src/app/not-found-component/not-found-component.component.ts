import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.scss']
})
export class NotFoundComponentComponent implements OnInit {

  constructor(private titleService:Title, private meta: Meta) {

    this.titleService.setTitle(" 404 Page Introuvable");

   }

  ngOnInit() {
  }

}
