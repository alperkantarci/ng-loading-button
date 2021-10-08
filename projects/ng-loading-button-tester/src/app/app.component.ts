import { Component } from '@angular/core';
import { NgLoadingButtonService } from 'ng-loading-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-loading-button-tester';

  constructor(private ngLoadingButtonService: NgLoadingButtonService) {}

  fetch(id: string) {
    this.ngLoadingButtonService.showLoading(id);
    setTimeout(() => {
      this.ngLoadingButtonService.hideLoading(id);
    }, 5000);
  }

}
