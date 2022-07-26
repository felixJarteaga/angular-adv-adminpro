import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponentt } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path:'', component:DashboardComponent, data:{ titulo: 'Dashboard' } },
      { path:'progress', component:ProgressComponent, data:{ titulo: 'ProgressBar' } },
      { path:'grafica1', component:Grafica1Component, data:{ titulo: 'Grafica #1' } },
      { path:'account-settings', component:AccountSettingComponent, data:{ titulo: 'Account-Settings' } },
      { path:'promesas', component:PromesasComponent, data:{ titulo: 'Promesas' } },
      { path:'rxjs', component:RxjsComponentt, data:{ titulo: 'Rxjs' } },
      { path:'perfil', component:PerfilComponent, data:{ titulo: 'Perfil de usuario' } },
      { path:'buscar/:termino', component:BusquedaComponent, data:{ titulo: 'Busquedas' } },
      // Mantenimientos
      { path:'hospitales', component:HospitalesComponent, data:{ titulo: 'Mantenimiento de hospitales' } },
      { path:'medicos', component:MedicosComponent, data:{ titulo: 'Mantenimiento de medicos' } },
      { path:'medico/:id', component:MedicoComponent, data:{ titulo: 'Mantenimiento de medico' } },

      // RUTAS DE ADMIN
      { path:'usuarios', canActivate:[AdminGuard], component:UsuariosComponent, data:{ titulo: 'Mantenimiento de usuarios' } },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
