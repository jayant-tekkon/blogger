import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { Blogpost } from '../../blogpost/blogpost';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  blogs: Blogpost;
  error: {};

  constructor(
    private router: Router,
    private blogService: BlogpostService
  ) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
      (data: Blogpost) => this.blogs = data['data'],
      error => this.error = error
    )
  }

  deleteBlog(id: number) {
    if(confirm('Are you sure want to delete id =' + id)) {
      this.blogService.deleteBlog(+id).subscribe(
        res => {
          this.ngOnInit();
        },
        error => this.error = error
      )
    }
  }



}
