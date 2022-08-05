import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';
import { Blogs } from 'src/app/services/interfaces/blogs';
import { AuthService } from 'src/app//services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    blogArchive?: Blogs[];
    user: string = '';
    constructor(private blogs: BlogsService, private auth: AuthService) { }

    ngOnInit(): void {
        this.blogs.getAll()
        .subscribe((archive) =>
        {   
            this.blogArchive = archive;
            console.log(this.blogArchive)
        })
        
        this.user = localStorage.getItem('user')!.substring(0,1).toUpperCase().concat(this.auth.getUsername().substring(1));
    }

    logout()
    {
        return this.auth.logout()
    }

}
