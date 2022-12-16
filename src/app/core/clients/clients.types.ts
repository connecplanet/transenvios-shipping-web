export interface Client
{
    id: string;
    documentType?: string;
    documentId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
}

export interface Country
{
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

