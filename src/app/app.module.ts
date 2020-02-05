import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlogpostModule } from './blogpost/blogpost.module';
import { CmspageModule } from './cmspage/cmspage.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from 'src/app/admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BlogpostModule,
    CmspageModule,
    HttpClientModule,
    AuthModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Title, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
