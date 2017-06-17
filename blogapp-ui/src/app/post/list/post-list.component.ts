import { Component, OnInit } from '@angular/core';
import { PostService } from './../post.service';

@Component({
  selector: 'posts',
  templateUrl: './post-list.component.html',
  providers: [PostService]
})
export class PostListComponent implements OnInit {
  posts: any[];

  constructor(private dataService: PostService) { }

  ngOnInit() {
    this.posts = this.getPosts();    
  }

  private getPosts(): any[] {
    return this.dataService.get();
  }

}
