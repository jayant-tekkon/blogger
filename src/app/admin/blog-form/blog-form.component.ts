import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blogpost/blogpost.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../blogpost/category';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  pageTitle: string;
  uploadError: string;
  error: string;
  imagePath: string;
  blogForm: FormGroup;
  categories: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogpostService
  ) { }

  ngOnInit() {
    this.blogService.getCategories().subscribe(
      (data: Category) => this.categories = data['data'],
      error => this.error = error
    );

    const id= this.route.snapshot.paramMap.get('id');
    if(id) {
      this.pageTitle = "Edit Blog";
      this.blogService.getBlogDetail(+id).subscribe(
        res => {
          this.blogForm.patchValue({
            id: res['data'].id,
            category_id: res['data'].category_id,
            title: res['data'].title,
            is_featured: res['data'].is_featured,
            is_active: res['data'].is_active,
            description: res['data'].description
          });
          this.imagePath = res['data'].image;
        }
      )
    } else {
      this.pageTitle = "Create Blog";
    }
    this.blogForm = new FormGroup({
      id: new FormControl(""),
      category_id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      is_featured: new FormControl('0', Validators.required),
      is_active: new FormControl('1', Validators.required),
      image: new FormControl(''),
      description: new FormControl('', Validators.required)
    });
  }

  submitBlogForm() {
   const formData = new FormData();
   formData.append('category_id', this.blogForm.controls['category_id'].value);
   formData.append('title', this.blogForm.controls['title'].value);
   formData.append('is_featured', this.blogForm.controls['is_featured'].value);
   formData.append('is_active', this.blogForm.controls['is_active'].value);
   formData.append('description', this.blogForm.controls['description'].value);
  formData.append('image', this.blogForm.controls['image'].value);    
  const id = this.blogForm.get('id').value;
  if(id) {
    this.blogService.updateBlog(formData, +id).subscribe(
      res => {
        if(res['message']) {
          this.router.navigate(['/admin/blogs']);
        } else {
          this.uploadError = res['errors'];
        }
      },
      error => this.error = error
    )
  } else {
    this.blogService.createBlog(formData).subscribe(
      res => {
        console.log(res);
        if(res['message']) {
          this.router.navigate(['admin/blogs']);
        } else {
          this.uploadError = res['errors'];
        }
      },
      error => this.error = error
    )
  }
  }

  uploadImage(event): void {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      // reader.onload = e => this.imagePath = reader.result;

      reader.readAsDataURL(file);
      
      this.blogForm.get('image').setValue(file);
    }
  }
}
