import { Component, OnInit } from '@angular/core';
import { AdminPostService } from './../admin-post.service';

@Component({
    moduleId: module.id,
    selector: 'post-list',
    templateUrl: 'post-list.component.html',
    providers: [AdminPostService]
})
export class AdminPostListComponent implements OnInit {
    items: any;

    constructor(private dataService: AdminPostService) { }

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.items = this.dataService.get();
        console.log('items: ' + this.items);
    }
}
