import { Component, OnInit } from '@angular/core';
import { BlogpostService } from './blogpost.service';

@Component({
  selector: 'blogposts',
  templateUrl: './blogpost.component.html',
  providers: [BlogpostService]
})
export class BlogpostComponent implements OnInit {
  posts: any[];

  constructor(private dataService: BlogpostService) { }

  ngOnInit() {
    this.posts = this.getPosts();
    console.log(this.posts);
    
  }

  private getPosts(): any[] {
    return this.dataService.get();
  }

}
