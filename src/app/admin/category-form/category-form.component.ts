import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Category } from '../../blogpost/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  uploadError: string;
  pageTitle: string;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogpostService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.pageTitle = "Edit Category";
      this.blogService.getCategoryDetail(+id).subscribe(
        res=> {
          if(res.data) {
            this.categoryForm.patchValue({
              id: res['data'].id,
              name: res['data'].name,
              description: res['data'].description
            });
          }
        }
      )
    } else {
      this.pageTitle = "Create Category";
    }

    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  submitCategoryForm() {
    const formData = new FormData();
    formData.append('name', this.categoryForm.controls['name'].value),
    formData.append('description', this.categoryForm.controls['description'].value)

    const id = this.categoryForm.get('id').value;
    if(id) {
      this.blogService.updateCategory(formData, +id).subscribe(
        res => {
          if(res.success) {
            this.router.navigate(['admin/categories']);
          }
        },
        error => this.error = error
      )
    } else {
      this.blogService.createCategory(formData).subscribe(
        res => {
          if(res.success) {
            this.router.navigate(['admin/categories']);
          }
        },
        error => this.error = error
      )
    }
  }

}
