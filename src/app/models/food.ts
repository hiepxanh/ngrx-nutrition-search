
export interface Nutrient {
    nutrient_id: string;
    nutrient: string;
    unit: string;
    value: number;
    gm: number;
}

export interface IFood {
    id: string;
    name: string;
    nutrients: Nutrient[];
}

export class Food implements IFood {
    id: string;
    name: string;
    nutrients: Nutrient[];
    constructor(obj?:any) {
        this.id = obj.ndbo || '';
        this.name = obj.name || '';
        this.nutrients = obj.nutrients || [];
    }
}