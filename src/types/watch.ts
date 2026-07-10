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
}