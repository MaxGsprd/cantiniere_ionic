import { User } from "./User";

export class Commande {
    id: number;
    status: number;
    user: User;
    creationDate: string;
    creationTime: string;
}