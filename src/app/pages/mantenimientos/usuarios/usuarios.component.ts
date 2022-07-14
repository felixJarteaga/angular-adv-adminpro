import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios:number = 0;
  usuarios:Usuario[] = [];
  usuariosTemp:Usuario[] = [];

  imgSubs:Subscription;
  desde:number = 0;
  cargando:boolean = true;

  constructor( private usuarioServices:UsuarioService, private busquedasService:BusquedasService, private modalImagenService:ModalImagenService ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImage
    .pipe(
      delay(100)
    )
    .subscribe( img => {
      this.cargarUsuarios();
    });
  }
  
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServices.cargarUsuarios(this.desde)
          .subscribe( ({ total, usuarios }) => {
            this.totalUsuarios = total;
            this.usuarios = usuarios;
            this.usuariosTemp = usuarios;
            this.cargando = false;
          });
  }

  cambiarPagina( valor:number ){
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >=this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    return this.busquedasService.buscar('usuarios', termino)
          .subscribe( (resultados:Usuario[]) => {
            this.usuarios = resultados;
          });
  }

  eliminarUsuario( usuario:Usuario ){

    if (usuario.uid === this.usuarioServices.uid) {
      return Swal.fire('Error','No puede borrarse a si mismo','error');
    }
  
    return Swal.fire({
    title: '¿Borrar usuario?',
    text: `Está apunto de borrar a ${ usuario.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrarlo'
}).then((result) => {
  if (result.isConfirmed) {
    this.usuarioServices.eliminarUsuario( usuario )
              .subscribe( resp => {
                Swal.fire('Usuario borrado', `${ usuario.nombre } fue eliminado correctamente`, 'success');
                this.cargarUsuarios();
              });
  }
})
}

cambiarRole(usuario:Usuario){
this.usuarioServices.guardarUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
      });
}

abrirModal(usuario:Usuario){
  this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  
}

}
