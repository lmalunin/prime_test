import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from 'primeng/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { InnerFormComponent } from './index/inner-form/inner-form.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InnerFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        InputTextModule,
        SliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
