import { Component, OnInit } from '@angular/core';
import { AdminPostService } from './../admin-post.service';

@Component({
    moduleId: module.id,
    selector: 'post-create',
    templateUrl: 'post-create.component.html',
    providers: [AdminPostService]
})
export class PostCreateComponent implements OnInit {
    model: any = {};
    constructor(private dataService: AdminPostService) { }

    ngOnInit() {
    }

    save() {
        console.log(this.model);
        this.model = this.dataService.save(this.model);
        console.log(this.model);
    }
}
