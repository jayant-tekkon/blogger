import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Blogpost } from '../blogpost';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blogpost-recent',
  templateUrl: './blogpost-recent.component.html',
  styleUrls: ['./blogpost-recent.component.css']
})
export class BlogpostRecentComponent implements OnInit {

  blogs: Blogpost;
  error: {}
  blogDetail: Blogpost;
  blogId: number;

  constructor(private blopostService: BlogpostService) { }

  ngOnInit() {
    this.blopostService.getRecentBlogs().subscribe(
      (data: Blogpost) => this.blogs = data['data'],
      error => this.error = error
    );
  }

}
