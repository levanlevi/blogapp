import { Injectable } from '@angular/core';

@Injectable()
export class BlogpostService {
    public get(): any[] {
        let posts = [
            {
                title: "title",
                body: "ყურადღება არის თანამედროვე ეკონომიკაში ყველაზე მყარი ვალუტა. ნებისმიერი ეკონომიკური ტრანზაქცია იწყება ყურადღებით. უფრო",
                date: new Date(),
                author: "Some one",
                categories: [
                    {
                        name: "self-help",
                        id: "12312i43ur8934naegaqeqeqrh"
                    }
                ]
            },
            {
                title: "2 title",
                body: "2 ყურადღება არის თანამედროვე ეკონომიკაში ყველაზე მყარი ვალუტა. ნებისმიერი ეკონომიკური ტრანზაქცია იწყება ყურადღებით. უფრო",
                date: new Date(),
                author: "levi",
                categories: [
                    {
                        name: "self-help",
                        id: "12312i43ur8934naegaqeqeqrh"
                    }
                ]
            },
            {
                title: "title 3",
                body: "3 ყურადღება არის თანამედროვე ეკონომიკაში ყველაზე მყარი ვალუტა. ნებისმიერი ეკონომიკური ტრანზაქცია იწყება ყურადღებით. უფრო",
                date: new Date(),
                author: "me",
                categories: [
                    {
                        name: "self-help",
                        id: "12312i43ur8934naegaqeqeqrh"
                    }
                ]
            }
        ]

        return posts;
    }
}