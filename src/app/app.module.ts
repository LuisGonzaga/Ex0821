import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [AppComponent, GeneratorComponent, PaymentsComponent],
  imports: [BrowserModule, MatIconModule, MatGridListModule, FormsModule],
  providers: [AppComponent],
  bootstrap: [AppComponent, GeneratorComponent],
})
export class AppModule {}
