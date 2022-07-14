import { MedicolUser } from "../interfaces/_medicolUser.interface";
import { Hospital } from "./hospital.model";


export class Medico {

  constructor( public nombre:string, public _id?:string, public img?:string, public usuario?:MedicolUser, public hospital?:Hospital ) {}

}