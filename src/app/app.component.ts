import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  valores = []
  //title = 'ControlDePropuestasYDeFacturacion';
  title = 'proposalControlF'

  ver(){
    console.log('lvalores', this.valores);
  }
}
/*"buildProduction": "ng build --configuration production --base-href /proposalControl_F/",
    "buildDev": "ng build --base-href /proposalControl_F/"*/
    /** "browserTarget": "proposalControl_F:build"
     *
     * "development": {
              "browserTarget": "proposalControl_F:build:development"
            }
     */
 /*"maximumWarning": "2kb",
                  "maximumError": "8kb"*/
