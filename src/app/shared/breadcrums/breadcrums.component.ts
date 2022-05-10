import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy {

  titulo:string;
  titulo$:Subscription;

  constructor( private router:Router ) {
  this.titulo$ = this.getArgumentosRuta().subscribe( data => {
      this.titulo = data.titulo;
      document.title=`AdminPro-${data.titulo}`;
    });
   }
  ngOnDestroy(): void {
    this.titulo$.unsubscribe();
  }

   getArgumentosRuta(){
       return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) =>event.snapshot.firstChild ===null  ),
      map( (event:ActivationEnd) =>event.snapshot.data  )
    );
    
   }


}
