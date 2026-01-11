import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SceneGraph} from './components/scene-graph/scene-graph';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SceneGraph],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Design-Projects');
}
