import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-message',
  imports: [MatCardModule],
  templateUrl: './error-message.html'
})
export class ErrorMessageComponent {
  @Input() message = '';
}
