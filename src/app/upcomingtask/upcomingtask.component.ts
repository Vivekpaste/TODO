import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitter/emitter';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-upcomingtask',
  templateUrl: './upcomingtask.component.html',
  styleUrls: ['./upcomingtask.component.css']
})
export class UpcomingtaskComponent {

  isResultLoaded=false;
  isUpdateFormActive=false;
  task_name:string="";
  task_des:string="";
  sub_task_name:string="";
  category:string="";
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
  endaddtask:boolean=false;
  toggle:boolean=false;
  allcategories: any[]=[];
  

  constructor(
    private FormBuilder:FormBuilder,
    private http: HttpClient,
    ) {}
  

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

    );
    this.form = this.FormBuilder.group({
      task_name: "",
      task_des: "",
      due_date:"",
      category:"",
      priority:"",
    });

  
  }


  gettasks() {
    this.http.get(`http://localhost:5000/app/${this.currentID}`).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData);
      this.task_array = resultData;
  
      const currentDate = new Date(); // Get the current date and time
  
      this.overdueTasks = [];
      this.tasksByDate = [];
  
      this.task_array.forEach((task) => {
        const taskDate = new Date(task.due_date);
        if (taskDate < currentDate) {
          // The task date has passed, put it in the overdueTasks array
          this.overdueTasks.push(task);
        } else {
          // The task date is in the future or the same as the current date, put it in the tasksByDate array
          this.tasksByDate.push(task);
        }
      });
  
      console.log('Overdue Tasks:', this.overdueTasks);
      console.log('Tasks By Date:', this.tasksByDate);
    });
  }
  
  
  reset()
  
  {
    this.task_name="";
    this.task_des="";
    this.due_date="";
  }
  
  task_details() {
      // Check if a task has been clicked before toggling the sidebar
      if (!this.taskClicked && !this.opens) {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.opens=true;
        console.log("Hello")
      }
      else if(!this.taskClicked && this.opens)
      {
        this.isSidebarOpen = this.isSidebarOpen;
        console.log("vivek")
      }
      this.taskClicked = false; // Reset the taskClicked flag
    }
    
  addtask()
  {
    let task=this.form.getRawValue(
      
    );
    let date=this.currentDate;
    task.date = date.toISOString();
    console.log(task.date);
    this.http.post(`http://localhost:5000/app/addtask/${this.currentID}`,task).subscribe((resultData: any)=>
    {
      console.log(task);
      alert("Task Registered Successfully");
      this.gettasks();
      this.reset();
    })
  }
  addsubtask()
  {
    this.type="subtask";
    let subtask=this.form.getRawValue();
    this.http.post(`http://localhost:5000/app/addtask/${this.currentID}`,subtask).subscribe((resultData:any)=>
    {
      console.log(subtask);
      alert("Task Registered Successfully");
      this.gettasks();
      this.reset();
    })
      // This function appears to be empty; you can add your logic here if needed.
  }
    
  selectTask(task: any) {
    this.selectedTask = task;
    this.isSidebarOpen = true;
    this.ShowAddTaskForm = false;
    this.opens=false;
  }
  
  showAddTaskForm() {
    this.selectedTask = null;
    this.isSidebarOpen = true;
    this.ShowAddTaskForm = true;
    this.opens=false;
    this.taskClicked=false;
   
  }
  closeaddtask()
  {
  
  }
  
  opensidebar(task: any) 
  {
      this.selectedTask = task;
      this.isSubtaskSidebarOpen = true;
  }
    
  
  closesidebar()
  {
      this.isSidebarOpen = false;
      this.opens=false;
  }
    
  
  onsearch()
  {
    
    // this.http.post(`http://localhost:5000/search/${this.currentID}`).subscribe(resultdata=>{
    //   console.log(requestBody);
    
    //   this.gettasks();
    //   this.reset();
  
    
  }
  
  deleteTask(id:string) {
    this.http.delete(`http://localhost:5000/del/${id}`).subscribe(resultData => {
      alert("Task deleted Successfully");
      console.log(id);
      this.gettasks();
      this.reset();
    });
  }
  
  setfilter(event: any) {
    const selectedValue = parseInt(event.target.value, 10);
    if (selectedValue === 1) {
      this.http.get<any[]>(`http://localhost:5000/hi/${this.currentID}`).subscribe(resultData => {
        this.isResultLoaded = true;
        this.task_array = resultData;
        console.log(this.tasksByDate);
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
  
  Logout() {
    this.http.post(`http://localhost:5000/logout`,{withCredentials :true}).subscribe(()=>{ 
      this.authenticated = false;
      console.log("hello");
  });
  }

}
