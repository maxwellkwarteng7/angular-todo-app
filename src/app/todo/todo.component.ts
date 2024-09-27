import { CommonModule } from '@angular/common';
import { Component  , OnInit, signal, Signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAllUserTodos, getUsernameAsKey } from '../models/data';
import { Router } from '@angular/router';
import { todo } from '../models/interface';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  
  userTodos = signal<todo [] | null >([]); 

  constructor(private router: Router) { }

  
  ngOnInit(): void {
    this.userTodos.set(getAllUserTodos());  
    console.log(this.userTodos()); 
  }

  
  
  clicked: boolean = false; 

  todoForm: FormGroup = new FormGroup({
    todo: new FormControl('', [Validators.required])
  });


  completed() {
    this.clicked = !this.clicked; 
  }

  get f() {
    return this.todoForm.controls; 
  }

  // key generator 
  generateKey() {
    let id = Math.ceil(Math.random() * 1000); 
    return id; 
  }

  //reset the form 
  resetForm() {
    this.todoForm.reset(); 
  }

  handleTodoSubmission() {
    const task = this.todoForm.value; 
    console.log(task); 
  
    let newTodo: todo[] = [
      {
        task : task.todo  ,  
        id: this.generateKey()
      }
    ]

    let updateTodo: todo = {
      task : task.todo  ,  
      id : this.generateKey()
    }

   
    //create the key for getting the todos
    const key = getUsernameAsKey(); 

    //checking to see if the user already have some todos there 
    const areSomeTodosThere = localStorage.getItem(key); 

    if (areSomeTodosThere) {
      const todos = JSON.parse(areSomeTodosThere); 
      todos.push(updateTodo); 

      let updateTodos = JSON.stringify(todos); 

      // store them 
      localStorage.setItem(key, updateTodos); 

      // reset the form 
      this.resetForm(); 

      // get all the todos after an update 
      getAllUserTodos(); 

      alert('Todos have been updated'); 
    } else {
        // stringifying the newTodo object to store 
      const Todo = JSON.stringify(newTodo); 

    //storing the todo in the local storage 
      localStorage.setItem(key, Todo);

      // get all the todos after an update 
      getAllUserTodos(); 
      
      //reset the form 
      this.resetForm();
      
      alert('New todo added'); 

    }
  }

  handleLogout() {
    // we will ask if the wants to really logout
    // let's remove the token 
    localStorage.removeItem('token'); 
    localStorage.removeItem('store'); 
    this.router.navigateByUrl('/login'); 
  }

}
