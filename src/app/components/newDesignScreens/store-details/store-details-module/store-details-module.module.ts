import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailsModuleRoutingModule } from './store-details-module-routing.module';
import { StoreDetailsComponent } from '../store-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [StoreDetailsComponent],
  imports: [
    CommonModule,
    StoreDetailsModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ]
})
export class StoreDetailsModuleModule { }
