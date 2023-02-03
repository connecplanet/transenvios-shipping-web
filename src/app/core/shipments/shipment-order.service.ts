import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { map, Observable, ReplaySubject } from "rxjs";
import { IShipmentOrder } from "./shipment-order.types";

@Injectable({
    providedIn: 'root'
})
export class ShipmentOrderService
{
    private baseUrl = `${environment.apiUrl}`;
    private subject: ReplaySubject<IShipmentOrder> = new ReplaySubject<IShipmentOrder>(1);

    constructor(private _httpClient: HttpClient)
    {
    }

    set model(value: IShipmentOrder)
    {
        this.subject.next(value);
    }

    get model$(): Observable<IShipmentOrder>
    {
        return this.subject.asObservable();
    }

    get(date: Date): Observable<IShipmentOrder[]>
    {
        if(!date){
            date = new Date();
        }

        const month = this.padTo2Digits(date.getMonth() + 1);
        const day = this.padTo2Digits(date.getDate());
        const fetchDate = `${date.getFullYear()}${month}${day}`;

        return this._httpClient.get<IShipmentOrder[]>(
            `${this.baseUrl}/api/shipments/${fetchDate}/orders`);
    }

    update(data: IShipmentOrder): Observable<any>
    {
        return this._httpClient.put<IShipmentOrder>(
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
