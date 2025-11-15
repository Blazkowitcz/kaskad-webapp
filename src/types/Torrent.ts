import {User, Language, Subcategory} from './';

export type Torrent = {
    id: string;
    name: string;
    slug: string;
    description: string;
    mediainfo: string;
    hash: string;
    size: number;
    completed: number;
    createdAt: Date;
    user: User;
    seeders?: number
    languages: Language[];
    subcategory: Subcategory;
}