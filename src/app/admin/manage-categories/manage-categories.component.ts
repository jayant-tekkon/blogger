import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { Category } from '../../blogpost/category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  categories: Category;
  error: {};

  constructor(private blogService: BlogpostService) { }

  ngOnInit() {
    this.blogService.getCategories().subscribe(
      (data: Category) => this.categories = data['data'],
      error => this.error = error
    )
  }

  deleteCategory(id:number) {
    if(confirm('Are you sure want to delete this?')) {
      this.blogService.deleteCategory(+id).subscribe(
        res=> {
          if(res.success) {
            this.ngOnInit();
          }
        }
      )
    }
  }

}
