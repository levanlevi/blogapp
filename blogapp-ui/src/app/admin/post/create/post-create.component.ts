import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminPostService } from './../admin-post.service';

@Component({
    moduleId: module.id,
    selector: 'post-create',
    templateUrl: 'post-create.component.html',
    providers: [AdminPostService]
})
export class PostCreateComponent implements OnInit, AfterViewInit {
    model: any = {};

    constructor(private dataService: AdminPostService) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        
    }

    save() {
        this.dataService.save(this.model)
            .subscribe(data => console.log(data));
    }
}
