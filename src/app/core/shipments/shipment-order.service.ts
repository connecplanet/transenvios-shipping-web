import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { map, Observable, ReplaySubject } from "rxjs";
import { IShipmentListItem, IShipmentOrder } from "./shipment-order.types";

@Injectable({
    providedIn: 'root'
})
export class ShipmentOrderService
{
    private baseUrl = `${environment.apiUrl}`;
    private subject: ReplaySubject<IShipmentListItem> = new ReplaySubject<IShipmentListItem>(1);

    constructor(private _httpClient: HttpClient)
    {
    }

    set model(value: IShipmentListItem)
    {
        this.subject.next(value);
    }

    get model$(): Observable<IShipmentListItem>
    {
        return this.subject.asObservable();
    }

    get(fetchLastDays: number): Observable<IShipmentListItem[]>
    {
        return this._httpClient.get<IShipmentListItem[]>(
            `${this.baseUrl}/api/shipments/${fetchLastDays}/orders`);
    }

    getDetails(orderId: number): Observable<IShipmentOrder>
    {
        return this._httpClient.get<IShipmentOrder>(
            `${this.baseUrl}/api/shipments/${orderId}`);
    }

    update(data: IShipmentListItem): Observable<any>
    {
        return this._httpClient.put<IShipmentListItem>(
            `${this.baseUrl}/api/Shipments`, data).pipe(
            map((response) => {
                // this.subject.next(response);
            })
        );
    }

    delete(id: string): Observable<any>
    {
        return this._httpClient.delete(
            `${this.baseUrl}/api/Shipments/${id}`);
    }

    padTo2Digits(value: number): string {
        return value.toString().padStart(2, '0');
    }
}
