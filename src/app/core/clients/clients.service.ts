import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Client } from 'app/core/clients/clients.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientAdminService
{
    private _client: ReplaySubject<Client> = new ReplaySubject<Client>(1);

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
    set user(value: Client)
    {
        // Store the value
        this._client.next(value);
    }

    get user$(): Observable<Client>
    {
        return this._client.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list of users
     */
    get(): Observable<Client[]>
    {
        return this._httpClient.get<Client[]>(`${environment.apiUrl}/api/Users`);
    }

    /**
     * Update the user
     *
     * @param client
     */
    update(client: Client): Observable<any>
    {
        return this._httpClient.put<Client>(`${environment.apiUrl}/api/Users/${client.id}`, client).pipe(
            map((response) => {
                this._client.next(response);
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
         return this._httpClient.delete(`${environment.apiUrl}/api/Users/${id}`);
     }
}
