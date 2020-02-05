import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AuthGuard } from '../auth/auth.guard';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {path: 'blogs', component: ManageBlogsComponent},
          {path: 'blogs/create', component: BlogFormComponent},
          {path: 'blogs/edit/:id', component: BlogFormComponent},
          {path: 'blogs/delete/:id', component: BlogFormComponent},
          {path: 'categories', component: ManageCategoriesComponent},
          {path: 'categories/create', component: CategoryFormComponent},
          {path: 'categories/edit/:id', component: CategoryFormComponent},
          {path: 'categories/delete/:id', component: CategoryFormComponent},
          {path: '', component: AdminDashboardComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
