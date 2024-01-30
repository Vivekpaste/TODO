import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitter/emitter';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-completedtask',
  templateUrl: './completedtask.component.html',
  styleUrls: ['./completedtask.component.css']
})
export class CompletedtaskComponent 
{  isResultLoaded=false;
  isUpdateFormActive=false;
  task_name:string="";
  task_des:string="";
  sub_task_name:string="";
  task_array:any[]=[];
  sub_task_array:any[]=[];
  priority:number=0;
  currentID:string="";
  user_name=" ";
  message:any;
  task_id=0;
  authenticated = false;
  user_task_name="dsvsdvsdsvsdvs";
  user_task_id=0;
  currentDate=new Date();
  isSidebarOpen=false;
  overdueTasks: any[] = [];
  todayTasks: any[] = [];
  laterTasks: any[] = [];
  due_date:string="";
  tasksByDate: any[]=[];
  selectedTask: any | null = null;
  taskClicked: boolean = false;
  isSubtaskSidebarOpen: boolean = false;
  ShowAddTaskForm: boolean = false;
  form!: FormGroup;
opens:boolean=false;
  type:string="";
  deletion_date=new Date();
  endaddtask:boolean=false;
  options = [
    

  ];

  selectedOption: string = 'option1'; // Default selected option
  allcategories: any[]=[];
  toggle: boolean=false;

  constructor(private http: HttpClient) {

  }
  

  ngOnInit():void{
    this.http.get('http://localhost:5000/user',{
      withCredentials:true
    }).subscribe((resp:any)=>{
      this.user_name=resp.user_name;
      this.currentID=resp.user_id;
      Emitters.authEmitter.emit(true);

      this.getcompletedtask();
  
    },
    (err)=>
    {
      this.message="you are not logged in";
      Emitters.authEmitter.emit(false);
    }

    )
  
  }
  getCategory()
  {
    this.allcategories=[];
    this.toggle=true;
    this.http.get(`http://localhost:5000/all_cat/${this.currentID}`).subscribe((resultData:any)=>
    {
      console.log(resultData);
      this.allcategories=resultData;
    })
    
  }


 

getsubtask(taskId:string)
{
  this.http.get(`http://localhost:5000/sub/${taskId}/${this.currentID}`).subscribe((resultData:any)=>
  {
    this.isResultLoaded = true;
    this.sub_task_array=resultData;
    console.log("taskid=",taskId);
    console.log(this.sub_task_array);

  })
}


reset()

{
  this.task_name="";
  this.task_des="";
  this.due_date="";
}

task_details() {
  if (!this.taskClicked && !this.opens) {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.opens = true;
  } else if (!this.taskClicked && this.opens) {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  this.taskClicked = false;
  if (!this.isSidebarOpen) {
    this.opens = false;
  }
  this.getcompletedtask();
}


selectTask(event: Event, task: any) {
  event.preventDefault();

  // Check if the selected task is the same as the current one
  if (this.selectedTask === task) {
    // If it's the same task, toggle the task details
    this.taskClicked = !this.taskClicked;
  } else {
    // If it's a different task, update the selected task
    this.selectedTask = task;
    this.taskClicked = true;
    this.getsubtask(task.id);
  }

  console.log('Selected Task:', this.selectedTask);
  console.log('Task Clicked:', this.taskClicked);


  this.isSidebarOpen = true;
  this.ShowAddTaskForm = false;
  this.opens = false;
}



showAddTaskForm() {
  this.selectedTask = null;
  this.isSidebarOpen = true;
  this.ShowAddTaskForm = !this.ShowAddTaskForm;
  this.opens = false;
  this.taskClicked = false;
}


closeaddtask() {
  this.isSidebarOpen = false;
  this.ShowAddTaskForm = false;
  this.opens = false;
  this.taskClicked = false;
  
}

opensidebar(task: any) {
  this.selectedTask = task;
  this.isSubtaskSidebarOpen = true;
}

closesidebar() {
  this.isSidebarOpen = false;
  this.ShowAddTaskForm = false;
  this.opens = false;
}
  

onsearch()
{
  
  // this.http.post(`http://localhost:5000/search/${this.currentID}`).subscribe(resultdata=>{
  //   console.log(requestBody);
  
  //   this.gettasks();
  //   this.reset();

  
}

getcompletedtask()
{
  this.http.get(`http://localhost:5000/com/${this.currentID}`).subscribe((resultData:any)=>
    {
      this.isResultLoaded=true;
      console.log(resultData);
      this.task_array=resultData;
      console.log(this.task_array)
      const currentDate = new Date(); // Get the current date and time
    })
}


setfilter(event: any) {
  const selectedValue = parseInt(event.target.value, 10);
  if (selectedValue === 1) {
    this.http.get<any[]>(`http://localhost:5000/hi/${this.currentID}`).subscribe(resultData => {
      this.isResultLoaded = true;
      this.task_array = resultData;
    });
  } else if (selectedValue === 2) {
    this.http.get<any[]>(`http://localhost:5000/low/${this.currentID}`).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      this.task_array = resultData;
    });
  } else if (selectedValue === 3) {
    this.http.get(`http://localhost:5000/rem/${this.currentID}`).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      this.task_array = resultData;
    });
  }
}
Logout()
{
}}