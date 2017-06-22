import { Component, OnInit } from '@angular/core';
import { AdminPostService } from './../admin-post.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'post-create',
    templateUrl: 'post-create.component.html',
    providers: [AdminPostService]
})
export class PostCreateComponent implements OnInit {
    model: any = {};
    private sub: Subscription;
    private id: any;

    constructor(private dataService: AdminPostService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                this.id = params['id'];
                if (this.id) { // it's edit mode
                    this.model = this.getPost(this.id);
                } else {
                    this.model = {};
                }
            });
    }

    private getPost(id: any): any {
        return this.dataService.getById(id)
            .subscribe(data => this.model = data);
    }

    save() {
        if (this.id) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        this.dataService.save(this.model)
            .subscribe(data => console.log(data));
    }

    update() {
        this.dataService.update(this.id, this.model)
            .subscribe(data => console.log(data));
    }
}
