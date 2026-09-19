import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empty-state',
  imports: [MatCardModule],
  templateUrl: './empty-state.html'
})
export class EmptyStateComponent {
  @Input() message = 'No todo items yet.';
}
