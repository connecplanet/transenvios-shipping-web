export interface Routes
{
    id: string;
    fromCityCode?: string;
    toCityCode?: string;
    
    fromCityCodeName?: string;
    toCityCodeName?: string;
    initialKiloPrice: number;
    additionalKiloPrice: number;
    priceCm3: number;
    active: boolean;
}

export interface Cities
{
    id: string;
    name: string;
    code: string;
}