import { Component, OnInit } from '@angular/core';
import {  MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  opened = true;
  over :MatDrawerMode = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  logo = './assets/images/logo-ufu.png';
  // overlap = false;

  media$: Observable<MediaChange[]>;

  constructor(media: MediaObserver,

    private translate: TranslateService) {
    this.media$ = media.asObservable()
  }

  ngOnInit() {
     this.media$.subscribe(change => {
      if (change[0].mqAlias === 'sm' || change[0].mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  logout() {
  }

}
