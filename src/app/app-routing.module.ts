import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import * as AppConfig from '../app/config/app.config';
import { LoginComponent } from "./templates/login/login.component";
import { HomeComponent } from "./home/home.component";
import { HeremapComponent } from "./templates/heremap";
import { NoticesComponent } from "./module/notice/notices.component";
import { NoticeComponent } from "./module/notice/notice.component";
import { TodosComponent } from "./module/todolist/todos.component";
import { TodoComponent } from "./module/todolist/todo.component";
import { ContactsComponent } from "./module/contact/contacts.component";
import { ShippingplansComponent } from "./module/shipping.plan/shippingplans.component";
import { ShippingplanComponent } from "./module/shipping.plan/shippingplan.component";
import { SPartnerComponent } from "./module/shipping.plan/s.partner.component";
import { POComponent } from "./module/purchaseorder/po.component";

const routes: Routes = [
    { path: "", redirectTo: "/pages/notices", pathMatch: "full" },
    { path: AppConfig.URL_LOGIN, component: LoginComponent },
    { path: "pages", component: HomeComponent, children: [
        { path: "heremap", component: HeremapComponent },
        { path: "notices", component: NoticesComponent },
        { path: "notice/:id", component: NoticeComponent },
        { path: "todos", component: TodosComponent },
        { path: "todo/:id", component: TodoComponent },
        { path: "contacts", component: ContactsComponent },
        { path: "shippingplans", component: ShippingplansComponent },
        { path: "shippingplan/:id", component: ShippingplanComponent },
        { path: "shippingplan/partner/detail", component: SPartnerComponent },
        { path: "po", component: POComponent },
    ]}, 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
