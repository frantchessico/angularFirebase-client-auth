export interface Client {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    balance: number;
    active?: boolean;
}
