import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from '../emitter/emitter';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isResultLoaded = false;
  isUpdateFormActive = false;
  task_name = "";
  task_des = "";
  task_tag="";
  category="";
  sub_task_name = "";
  sub_task_des="";
  task_array: any[] = [];
  sub_task_array:any[]=[];
  priority = 0;
  currentID = "";
  user_name = " ";
  message: any;
  task_id = 0;
  authenticated = false;
  user_task_name = "dsvsdvsdsvsdvs";
  user_task_id = 0;
  currentDate = new Date();
  isSidebarOpen = false;
  overdueTasks: any[] = [];
  todayTasks: any[] = [];
  laterTasks: any[] = [];
  due_date = new Date();
  tasksByDate: any[] = [];
  selectedTask: any | null = null;
  taskClicked = false;
  isSubtaskSidebarOpen = false;
  ShowAddTaskForm = false;
  showAddSubtaskForm=false;
  showUpdatetaskForm=false;
  subtaskForm!: FormGroup;
  form!: FormGroup;
  opens = false;
  type = "";
  endaddtask = false;
  allcategories: any[]=[];
  toggle:boolean=false;

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/user', {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.user_name = resp.user_name;
      this.currentID = resp.user_id;
      Emitters.authEmitter.emit(true);
      this.gettasks();
    },
    (err) => {
      this.message = "you are not logged in";
      Emitters.authEmitter.emit(false);
    });

    this.form = this.FormBuilder.group({
      task_name: "",
      task_des: "",
      due_date:"",
      category:"",
      priority:"",
    });

    this.subtaskForm = this.FormBuilder.group({
      sub_task_name: '',
      sub_task_des: '',
    });
  }
//hello
  gettasks() {
    this.http.get(`http://localhost:5000/app/${this.currentID}`).subscribe((resultData: any) => {
      this.isResultLoaded = true;
      this.task_array = resultData;
  
      const currentDate = new Date();
      this.overdueTasks = [];
      this.tasksByDate = [];
  
      this.task_array.forEach(task => {
        const taskDate = new Date(task.due_date);
        if (taskDate < currentDate) {
          this.overdueTasks.push(task);
        } else {
          this.tasksByDate.push(task);
        }
  
        // Log the task ID
       
      });
    });
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
  
 
  reset() {
    this.task_name = "";
    this.task_des = "";
    
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
    this.gettasks();
  }

  addtask() {
    let task = this.form.getRawValue();
    let date = this.currentDate;
    let fdate=this.due_date;
    let tags=this.task_tag;
    console.log(fdate);
    console.log(tags);
    task.date = date.toISOString();
    this.http.post(`http://localhost:5000/app/addtask/${this.currentID}`, task).subscribe((resultData: any) => {
      alert("Task Registered Successfully");
      this.gettasks();
      this.reset();
      this.opens = false;
    });
  }

  addsubtask(taskId: string) {
    this.type = "subtask";
    let subtask = this.subtaskForm.getRawValue();
    console.log('Subtask Name:', subtask.sub_task_name);
    console.log('Subtask Description:', subtask.sub_task_des);
  
    this.http.post(`http://localhost:5000/addsubtask/${taskId}/${this.currentID}`, subtask).subscribe((resultData: any) => {
      alert("Task Registered Successfully");
      this.gettasks();
      this.reset();
      this.opens = false;
      this.form.reset(); // Reset the form
    });
  }


  
  toggleAddSubtaskForm() {
    this.showAddSubtaskForm = !this.showAddSubtaskForm;
  
  }

  toggleUpdateTaskForm()
  {
    this.showUpdatetaskForm=!this.showUpdatetaskForm;
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
  onsearch() {
    // You can implement search logic here if needed
  }

  deleteTask(id:string) {
    this.http.delete(`http://localhost:5000/del/${id}`).subscribe(resultData => {
      alert("Task deleted Successfully");
      console.log(id);
      this.gettasks();
      this.reset();
    });
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
      this.http.get<any[]>(`http://localhost:5000/rem/${this.currentID}`).subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.task_array = resultData;
        console.log(this.task_array);
      });
    }
  }


  updateTask(taskId: string) {
    if (this.form.valid) {
      const updateUrl = `http://localhost:5000/upp/${taskId}`;
      const bodyData = this.form.value;
      console.log(bodyData);
      this.http.put(updateUrl, bodyData).subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert('Task Updated Successfully');
          this.gettasks();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      alert('Form is not valid. Please fill in all required fields.');
    }
  }


  Logout() {
    this.http.post(`http://localhost:5000/logout`,{withCredentials :true}).subscribe(()=>{ 
      this.authenticated = false;
      console.log("hello");
  });
  }
}
