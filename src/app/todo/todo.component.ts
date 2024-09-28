import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, Signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { getAllUserTodos, getUsernameAsKey } from "../models/data";
import { Router } from "@angular/router";
import { todo } from "../models/interface";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-todo",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit {
  constructor(private router: Router, private notify: NotificationService) {}

  userTodos = signal<todo[] | null>([]);

  ngOnInit(): void {
    this.userTodos.set(getAllUserTodos());
    console.log(this.userTodos());
  }

  clicked: boolean = false;

  todoForm: FormGroup = new FormGroup({
    todo: new FormControl("", [Validators.required]),
  });

  completed(val: number) {
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
        task: task.todo,
        id: this.generateKey(),
      },
    ];

    let updateTodo: todo = {
      task: task.todo,
      id: this.generateKey(),
    };

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

      this.notify.showSuccess("Updated TodoList", "");
    } else {
      // stringifying the newTodo object to store
      const Todo = JSON.stringify(newTodo);

      //storing the todo in the local storage
      localStorage.setItem(key, Todo);

      // get all the todos after an update
      getAllUserTodos();

      //reset the form
      this.resetForm();

      this.notify.showSuccess("New Todod Added", "");
    }
  }

  handleLogout() {
    // we will ask if the wants to really logout
    // let's remove the token
    localStorage.removeItem("token");
    localStorage.removeItem("store");
    this.router.navigateByUrl("/login");
  }

  // handle todo delete
  handleDelete(id: number) {
    this.notify.showConfirmation('Are you sure you want to delete ?', 'You cannot revert this ').then(result => {
      if (result.isConfirmed) {
        let userTodos = getAllUserTodos();
        // let's find the particular todo
        let todo = userTodos?.find((todo) => todo.id == id);
        console.log(todo);
      }
    });
  }
}
