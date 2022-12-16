import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Driver } from 'app/core/drivers/drivers.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DriverAdminService
{
    private _driver: ReplaySubject<Driver> = new ReplaySubject<Driver>(1);

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
    set user(value: Driver)
    {
        // Store the value
        this._driver.next(value);
    }

    get user$(): Observable<Driver>
    {
        return this._driver.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list of users
     */
    get(): Observable<Driver[]>
    {
        return this._httpClient.get<Driver[]>(`${environment.apiUrl}/api/Drivers`);
    }

    /**
     * Update the user
     *
     * @param driver
     */
    update(driver: Driver): Observable<any>
    {
        return this._httpClient.put<Driver>(`${environment.apiUrl}/api/Drivers/${driver.id}`, driver).pipe(
            map((response) => {
                this._driver.next(response);
            })
        );
    }

    /**
     * create the driver
     *
     * @param driver
     */
    create(driver: Driver): Observable<any>
    {
        return this._httpClient.post<Driver>(`${environment.apiUrl}/api/Drivers`, driver).pipe(
            map((response) => {
                this._driver.next(response);
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
         return this._httpClient.delete(`${environment.apiUrl}/api/Drivers/${id}`);
     }
}
