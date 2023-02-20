export interface IShipmentListItem {
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

export interface IShipmentOrder {
    orderId?: string;
    applicationDate?: string;
    paymentState?: string;
    shipmentState?: string;
    transporterId?: string;
    initialPrice?: string;
    taxes?: string;
    totalPrice?: string;
    customer?: IShipmentPerson;
    sender?: IShipmentPerson;
    recipient?: IShipmentPerson;
    packages?: IShipmentPackage[];
}

export interface IShipmentPerson {
    documentType: string;
    documentId: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    cityName?: string;
    address?: string;
}

export interface IShipmentPackage {
    id?: string;
    height?: string;
    length?: string;
    width?: string;
    weight?: string;
    quantity?: number;
    isFragile?: boolean;
    isUrgent?: boolean;
    lineId?: number;
}

export interface IShipmentState {
    id: number;
    name: string;
}
