export interface User
{
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    firstName: string;
    lastName: string;
    countryCode?: string;
    phone?: string;
}

export interface IDocumentType {
    id: number|string;
    name: string;
}
