import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valores = []
  title = 'ControlDePropuestasYDeFacturacion';

  ver(){
    console.log('lvalores', this.valores)
  }
}
