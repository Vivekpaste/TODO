import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{AddtaskComponent} from './addtask/addtask.component';
import { HomeComponent } from './home/home.component';
import { CompletedtaskComponent} from './completedtask/completedtask.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpcomingtaskComponent } from './upcomingtask/upcomingtask.component';
const routes: Routes = [
  {
    path:'viewtask',
    component:HomeComponent
  },
  {
    path:'addtask',
    component:AddtaskComponent
  },
  {
    path:'completedtask',
    component:CompletedtaskComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'Upcoming',
    component:UpcomingtaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
