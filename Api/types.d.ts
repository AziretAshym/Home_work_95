export interface UserFields {
    email: string;
    displayName: string;
    password: string;
    avatar: string;
    role: string;
    token: string;
}

export interface User {
    email: string;
    displayName: string;
    avatar: string;
    role: string;
}

export interface Ingredient {
    name: string;
    amount: string;
}

export interface Rating {
    user: User;
    rate: number;
}

export interface CocktailFields {
    user: User;
    title: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: Ingredient[];
    ratings: Rating[];
}
