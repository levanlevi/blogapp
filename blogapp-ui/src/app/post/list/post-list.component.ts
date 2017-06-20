import { Component, OnInit } from '@angular/core';
import { PostService } from './../post.service';

@Component({
  moduleId: module.id,
  selector: 'posts',
  templateUrl: 'post-list.component.html',
  providers: [PostService]
})
export class PostListComponent implements OnInit {
  posts: any;

  constructor(private dataService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts() {
    this.dataService.getList()
      .subscribe(data => this.posts = data);
  }

}
