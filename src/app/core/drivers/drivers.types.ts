export interface Driver
{
    id: string;
    documentType?: string;
    documentId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    pickUpCityId: string;
    pickUpAddress: string;
}

export interface Country
{
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}

export interface IDriverCatalog
{
    id: string;
    fullName: string
}
