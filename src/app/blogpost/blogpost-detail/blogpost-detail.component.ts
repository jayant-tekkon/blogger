import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Blogpost } from '../blogpost';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blogpost-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrls: ['./blogpost-detail.component.css']
})
export class BlogpostDetailComponent implements OnInit {

  blogDetail: Blogpost;
  blogId: number;
  error = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private blogpostService: BlogpostService
  ) { }

  ngOnInit() {
    this.blogId = this.route.snapshot.params.id;    
    this.blogpostService.getBlogDetail(this.blogId).subscribe(
      (data: Blogpost) => this.blogDetail = data['data'],
      error => this.error = error
    );
  }

}
