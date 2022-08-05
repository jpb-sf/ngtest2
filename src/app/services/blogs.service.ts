import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Blogs } from 'src/app/services/interfaces/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
    blogs: Blogs[] = [
        { 
            year: '2017', 
            blogs: {
                '1': [],
                '2': [],
                '3': []
            } 
        },
        { 
            year: '2018', 
            blogs: 
            {
                '1': [],
                '2': [],
                '3': []
            } 
        },
    ]

    test = {
        '2017': {
            blogs: 
            {
                '1': [],
                '2': [],
                '3': []
            }
        }
    }

    constructor() { }

    getAll(): Observable<any>
    {
        return of(this.blogs);
    }
}
