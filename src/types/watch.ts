// export interface Watch {
//     _id: string;
//     title: string;
//     brand: string;
//     modelYear: number;
//     price: number;
//     condition: string;
//     movement: "Automatic" | "Manual";
//     caliber: string;
//     caseSize: string;
//     dialColor: string;
//     waterResistance: string;
//     tagline: string;
//     images: string[];
// }

// export interface Watch {
//     _id: string;
//     title: string;
//     brand: string;
//     modelYear: number;
//     price: number;
//     condition: string;
//     movement: "Automatic" | "Manual";
//     caliber: string;
//     caseSize: string;
//     dialColor: string;
//     waterResistance: string;
//     tagline: string;
//     images: string[];
//     ownerId?: string;
//     status?: "available" | "sold";
//     buyerId?: string;
//     buyerName?: string;
//     buyerEmail?: string;
//     soldAt?: string;
// }


export interface Watch {
    _id: string;
    title: string;
    brand: string;
    modelYear: number;
    price: number;
    condition: string;
    movement: "Automatic" | "Manual";
    caliber: string;
    caseSize: string;
    dialColor: string;
    waterResistance: string;
    tagline: string;
    images: string[];
    ownerId?: string;
    quantity: number;
    buyerId?: string;
    buyerName?: string;
    buyerEmail?: string;
    soldAt?: string;
    status?: "available" | "sold";
}

export interface Order {
    _id: string;
    watchId: string;
    watchTitle: string;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    price: number;
    quantity: number;
    purchasedAt: string;
}