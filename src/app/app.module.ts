import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { InnerFormComponent } from './index/inner-form/inner-form.component';
import { ProductService } from './tablenew1/product.service';
import { Tablenew1Component } from './tablenew1/tablenew1.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InnerFormComponent,
        Tablenew1Component
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        InputTextModule,
        SliderModule,
        TableModule
    ],
    providers: [ProductService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
