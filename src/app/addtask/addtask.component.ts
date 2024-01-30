import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitter/emitter';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
  isResultLoaded=false;
  isUpdateFormActive=false;
  task_name:string="";
  task_des:string="";
  sub_task_name:string="";
  task_array:any[]=[];
  priority:number=0;
  currentID:string="";
  user_name=" ";
  message:any;
  task_id=0;
  authenticated = false;
  user_task_name="dsvsdvsdsvsdvs";
  user_task_id=0;
  currentDate=new Date();
  overdueTasks:any[]=[];
  tasksByDate:any[]=[];
  isSidebarOpen=false;

  constructor(private http: HttpClient) {

  }

  ngOnInit():void{
    this.http.get('http://localhost:5000/user',{
      withCredentials:true
    }).subscribe((resp:any)=>{
      this.user_name=resp.user_name;
      this.currentID=resp.user_id;
      Emitters.authEmitter.emit(true);
      this.gettasks();
    },
    (err)=>
    {
      this.message="you are not logged in";
      Emitters.authEmitter.emit(false);
    }

    )
  }

  gettasks()
  {
    this.http.get(`http://localhost:5000/app/${this.user_name}`).subscribe((resultData:any)=>
    {
      this.isResultLoaded=true;
      console.log(resultData);
      this.task_array=resultData;
      console.log(this.task_array);

    }
    )
  }

  task_details()
  {
    this.isSidebarOpen=!this.isSidebarOpen;
  }

Logout()
{
  
}
}
