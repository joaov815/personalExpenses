import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../environment/environment";

export class CrudService<Response = unknown> {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly basePath = "",
  ) {}

  get baseUrl(): string {
    return `${environment.apiUrl}/${this.basePath}`;
  }

  create<CreatePayload = unknown, CreateResponse = unknown>(payload: CreatePayload): Observable<CreateResponse> {
    return this.httpClient.post<CreateResponse>(this.baseUrl, payload);
  }

  updateById<UpdatePayload = unknown, UpdateResponse = unknown>(
    id: string,
    payload: UpdatePayload,
  ): Observable<UpdateResponse> {
    return this.httpClient.patch<UpdateResponse>(`${this.baseUrl}/${id}`, payload);
  }

  getById(id: string): Observable<Response> {
    return this.httpClient.get<Response>(`${this.baseUrl}/${id}`);
  }

  list(): Observable<Response[]> {
    return this.httpClient.get<Response[]>(this.baseUrl);
  }

  deleteById<DeleteResponse = unknown>(id: string): Observable<DeleteResponse> {
    return this.httpClient.delete<DeleteResponse>(`${this.baseUrl}/${id}`);
  }
}
