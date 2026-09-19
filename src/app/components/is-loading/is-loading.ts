import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-is-loading',
  imports: [MatProgressBarModule],
  templateUrl: './is-loading.html'
})
export class IsLoadingComponent {}
