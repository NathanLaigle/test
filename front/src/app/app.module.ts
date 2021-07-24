import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './c/header/header.component';
import { MenuPictoComponent } from './c/header/menu-picto/menu-picto.component';
import { ToolBarComponent } from './c/header/tool-bar/tool-bar.component';
import { LoginFormComponent } from './c/login-form/login-form.component';
import { MessageInfoComponent } from './c/message-info/message-info.component';
import { RegisterFormComponent } from './c/register-form/register-form.component';
import { AddAppFormComponent } from './c/add-app-form/add-app-form.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuPictoComponent, ToolBarComponent, LoginFormComponent, MessageInfoComponent, RegisterFormComponent, AddAppFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
