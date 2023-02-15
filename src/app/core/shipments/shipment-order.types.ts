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
    orderId: string;
    applicationDate: string;
    paymentState: string;
    shipmentState: string;
    transporterId: string;
    initialPrice: string;
    taxes: string;
    totalPrice: string;
    customer: IShipmentCustomer;
    sender: IShipmentSender;
    recipient: IShipmentRecipient;
    packages: IShipmentPackage[];
}

export interface IShipmentCustomer {
    documentType: string;
    documentId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface IShipmentSender {
    cityName: string;
    address: string;
    documentType: string;
    documentId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface IShipmentRecipient {
    cityName: string;
    address: string;
    documentType: string;
    documentId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface IShipmentPackage {
    id: string;
    height: string;
    length: string;
    width: string;
    weight: string;
    quantity: number;
    isFragile: boolean;
    isUrgent: boolean;
}

export interface IShipmentState {
    id: number;
    name: string;
}
