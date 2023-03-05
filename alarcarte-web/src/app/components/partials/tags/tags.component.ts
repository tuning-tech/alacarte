import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags?:Tag[];
  constructor() { }

  ngOnInit(): void {
  }

}
