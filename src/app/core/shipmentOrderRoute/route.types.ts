export interface Routes
{
    id: string;
    fromCityCode?: string;
    toCityCode?: string;
    initialKiloPrice: number;
    additionalKiloPrice: number;
    priceCm3: number;
    active: boolean;
}
