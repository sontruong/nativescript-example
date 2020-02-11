import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ToDo } from "./todo";
import { TodoService } from "./todo.service";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "ns-todo",
    moduleId: module.id,
    templateUrl: "./todo.component.html"
})
export class TodoComponent implements OnInit {
    item: ToDo;

    constructor(private itemService: TodoService, private route: ActivatedRoute, private page: Page) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
        this.page.actionBarHidden = true;
    }
}
