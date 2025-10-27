import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TodoComponent } from "./todo/todo.component";
import { authGuard } from "./auth.guard";
import { unauthenticatedGuardGuard } from "./unauthenticated-guard.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [unauthenticatedGuardGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [unauthenticatedGuardGuard]
  },
  {
    path: "todo",
    component: TodoComponent,
    canActivate: [authGuard],
  },
];
