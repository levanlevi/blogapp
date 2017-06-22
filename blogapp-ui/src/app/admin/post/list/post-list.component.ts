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
        this.dataService.getList()
            .subscribe(data => this.items = data);
    }

    remove(id) {
        this.dataService.remove(id)
            .subscribe(data => this.getPosts());
    }
}
