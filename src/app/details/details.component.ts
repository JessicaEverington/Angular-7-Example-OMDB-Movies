import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AppService } from '../app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  value: string;
  data: any;

  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.value = params.get('value');

      this.refresh();
    });
  }

  refresh() {
    this.appService.getDetails(this.value).subscribe(data => {
      this.data = data;
    })
  }

}
