import { Component, input, OnInit, signal, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { Toast } from "primeng/toast";
import { Subscription } from "rxjs";

import { CrudForm } from "../../common/crud-form";

@Component({
  selector: "pe-form-layout",
  standalone: true,
  imports: [Button, Toast],
  providers: [MessageService],
  templateUrl: "./form-layout.component.html",
  styleUrl: "./form-layout.component.scss",
})
export class FormLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _messageService: MessageService,
    private readonly _activedRoute: ActivatedRoute,
  ) {}

  form = input.required<CrudForm>();
  isLoading = signal(false);
  subscription: Subscription;

  ngOnInit(): void {
    const form = this.form();

    form.onInit({ id: this._activedRoute.snapshot.params["id"] ?? null, messageService: this._messageService });
    form.submitionStatus$.subscribe(status => this.isLoading.set(status === "submitting"));
  }

  ngOnDestroy(): void {
    this.form().onDestroy();
  }
}
