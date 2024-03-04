import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GametrackerComponent } from './components/gametracker/gametracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GametrackerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngGameTracker';
}
