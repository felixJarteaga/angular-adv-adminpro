import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {


  constructor( public modalImageService:ModalImagenService, private fileUploadService:FileUploadService ) { }

  imagenSubir:File;
  imgTemp:any;

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
  }

  cambiarImagen( e:any ){
    let imagen: File = e.target.files[0]; 
    this.imagenSubir = imagen;
    if (!imagen) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
    
  }

  subirImagen(){

    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir,tipo,id)
    .then( (img) => {
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      this.modalImageService.nuevaImage.emit(img);
      this.cerrarModal();
    }).catch( err => {
           console.log(err);
          Swal.fire('Error', 'No se pudo guardar la imagen', 'error');
     });
 }

}
