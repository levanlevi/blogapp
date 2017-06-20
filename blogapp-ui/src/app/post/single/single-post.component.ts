import { Component, OnInit } from '@angular/core';
import { PostService } from './../post.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'single-post',
    templateUrl: './single-post.component.html',
    providers: [PostService]
})
export class SinglePostComponent implements OnInit {
    post: any;
    private sub: Subscription;

    constructor(private dataService: PostService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(
            params => {
                let id = params['id'];
                if (!id) {
                    this.router.navigate['/posts'];
                }

                this.post = this.getPost(id);
            });
    }

    private getPost(id: any): any {
        return this.dataService.getById(id)
            .subscribe(data => this.post = data);
    }
}
