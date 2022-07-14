import { HospitalUser} from "../interfaces/_hospitalUser.interface";


export class Hospital {

  constructor( public nombre:string, public _id?:string, public img?:string, public usuario?:HospitalUser ) {}

}