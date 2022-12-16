import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { City } from 'app/core/cities/cities.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitiesService
{
    private _city: ReplaySubject<City> = new ReplaySubject<City>(1);

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
    set user(value: City)
    {
        // Store the value
        this._city.next(value);
    }

    get user$(): Observable<City>
    {
        return this._city.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list of cities
     */
    get(): Observable<City[]>
    {
        return this._httpClient.get<City[]>(`${environment.apiUrl}/api/Cities`);
    }
}
