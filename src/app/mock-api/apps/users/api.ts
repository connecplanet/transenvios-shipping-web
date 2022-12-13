import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { contacts as usersData, countries as countriesData, tags as tagsData } from 'app/mock-api/apps/users/data';

@Injectable({
    providedIn: 'root'
})
export class UsersMockApi
{
    private _users: any[] = usersData;
    private _countries: any[] = countriesData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Users - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/contacts/all')
            .reply(() => {

                // Clone the contacts
                const contacts = cloneDeep(this._users);

                // Sort the contacts by the name field by default
                contacts.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, contacts];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Users Search - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/contacts/search')
            .reply(({request}) => {

                // Get the search query
                const query = request.params.get('query');

                // Clone the contacts
                let contacts = cloneDeep(this._users);

                // If the query exists...
                if ( query )
                {
                    // Filter the contacts
                    contacts = contacts.filter(contact => contact.name && contact.name.toLowerCase().includes(query.toLowerCase()));
                }

                // Sort the contacts by the name field by default
                contacts.sort((a, b) => a.name.localeCompare(b.name));

                // Return the response
                return [200, contacts];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/contacts/contact')
            .reply(({request}) => {

                // Get the id from the params
                const id = request.params.get('id');

                // Clone the contacts
                const contacts = cloneDeep(this._users);

                // Find the contact
                const contact = contacts.find(item => item.id === id);

                // Return the response
                return [200, contact];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/apps/contacts/contact')
            .reply(() => {

                // Generate a new contact
                const newContact = {
                    id          : FuseMockApiUtils.guid(),
                    avatar      : null,
                    name        : 'New Contact',
                    emails      : [],
                    phoneNumbers: [],
                    job         : {
                        title  : '',
                        company: ''
                    },
                    birthday    : null,
                    address     : null,
                    notes       : null,
                    tags        : []
                };

                // Unshift the new contact
                this._users.unshift(newContact);

                // Return the response
                return [200, newContact];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPatch('api/apps/contacts/contact')
            .reply(({request}) => {

                // Get the id and contact
                const id = request.body.id;
                const contact = cloneDeep(request.body.contact);

                // Prepare the updated contact
                let updatedContact = null;

                // Find the contact and update it
                this._users.forEach((item, index, contacts) => {

                    if ( item.id === id )
                    {
                        // Update the contact
                        contacts[index] = assign({}, contacts[index], contact);

                        // Store the updated contact
                        updatedContact = contacts[index];
                    }
                });

                // Return the response
                return [200, updatedContact];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Contact - DELETE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onDelete('api/apps/contacts/contact')
            .reply(({request}) => {

                // Get the id
                const id = request.params.get('id');

                // Find the contact and delete it
                this._users.forEach((item, index) => {

                    if ( item.id === id )
                    {
                        this._users.splice(index, 1);
                    }
                });

                // Return the response
                return [200, true];
            });

        // -----------------------------------------------------------------------------------------------------
        // @ Countries - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/apps/users/countries')
            .reply(() => [200, cloneDeep(this._countries)]);

    }
}
