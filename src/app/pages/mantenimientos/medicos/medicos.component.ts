import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  cargando:boolean = true;
  medicos:Medico[] = [];
  imgSubs:Subscription;

  constructor( private medicosService:MedicoService, private modalImagenService:ModalImagenService, private busquedasService:BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
     this.imgSubs = this.modalImagenService.nuevaImage
    .pipe(
      delay(100)
    )
    .subscribe( img => {
      this.cargarMedicos();
    });
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicosService.cargarMedicos()
          .subscribe( medicos => {
            this.cargando = false;
            this.medicos = medicos;
          });
  }

  buscar(termino:string){
     if (termino.length === 0) {
      return this.cargarMedicos();
    }
    return this.busquedasService.buscar('medicos', termino)
          .subscribe( resultados => {
            this.medicos = resultados;
          });
  }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }

  borrarMedico(medico:Medico){
    Swal.fire({
    title: '¿Borrar usuario?',
    text: `Está apunto de borrar a ${ medico.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
}).then((result) => {
  if (result.isConfirmed) {
    this.medicosService.borrarMedico( medico._id )
              .subscribe( resp => {
                Swal.fire('Usuario borrado', `${ medico.nombre } fue eliminado correctamente`, 'success');
                this.cargarMedicos();
              });
  }
})
  }

}
