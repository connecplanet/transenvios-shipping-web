import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user-admin/users.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersAdminService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

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
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get list of users
     */
    get(): Observable<User[]>
    {
        return this._httpClient.get<User[]>(`${environment.apiUrl}/api/Users`);
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.put<User>(`${environment.apiUrl}/api/Users/${user.id}`, user).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

     /**
     * Update the user
     *
     * @param user
     */
     delete(id: string): Observable<any>
     {
         return this._httpClient.delete(`${environment.apiUrl}/api/Users/${id}`);
     }
}
