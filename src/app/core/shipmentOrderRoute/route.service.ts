import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { Routes } from './route.types';

@Injectable({
    providedIn: 'root'
})
export class RouteAdminService
{
    private _route: ReplaySubject<Routes> = new ReplaySubject<Routes>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: Routes)
    {
        // Store the value
        this._route.next(value);
    }

    get user$(): Observable<Routes>
    {
        return this._route.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list of users
     */
    get(): Observable<Routes[]>
    {
        return this._httpClient.get<Routes[]>(`${environment.apiUrl}/api/ShipmentRoute`);
    }

    /**
     * Update the user
     *
     * @param driver
     */
    update(routes: Routes): Observable<any>
    {
        return this._httpClient.put<Routes>(`${environment.apiUrl}/api/ShipmentRoute/${routes.id}`, routes).pipe(
            map((response) => {
                this._route.next(response);
            })
        );
    }

    /**
     * create the driver
     *
     * @param driver
     */
    create(driver: Routes): Observable<any>
    {
        return this._httpClient.post<Routes>(`${environment.apiUrl}/api/ShipmentRoute`, driver).pipe(
            map((response) => {
                this._route.next(response);
            })
        );
    }

     /**
     * Update the user
     *
     * @param id
     */
     delete(id: string): Observable<any>
     {
         return this._httpClient.delete(`${environment.apiUrl}/api/ShipmentRoute/${id}`);
     }
}
