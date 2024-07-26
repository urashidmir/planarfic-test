export interface Model {
    id: number;
    description: string;
    thumbnail: string;
}

export interface ModelDetail extends Model {
    model: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
}