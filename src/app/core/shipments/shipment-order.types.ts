export interface IShipmentOrder {
    id: number;
    applicationDate: string;
    customerName: string;
    phone: string;
    fromCity: string;
    toCity: string;
    paymentState: string;
    shipmentState: string;
    shipmentPrice: string;
    transporterName?: string;
    transporterId?: string;
    employeeId?: string;
}
