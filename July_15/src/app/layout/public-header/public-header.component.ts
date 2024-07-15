import { Component, ElementRef, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss'],
})
export class PublicHeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  activeCode: string;

  constructor(
    public elementRef: ElementRef,
    public _router: Router
  ) {
    super();
    this.activeCode = sessionStorage.getItem('currentUrl')?.toLowerCase() || '/authentication/signin';
  }

  ngOnInit() {
    
  }

}
