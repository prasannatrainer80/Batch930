import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Component({
  selector: 'app-public-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class PublicAgentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();

  }

  ngOnInit() {

  }

}
