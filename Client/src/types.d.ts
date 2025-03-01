export interface RegisterMutation {
  email: string;
  password: string;
  displayName?: string;
  avatar?: File;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  role: string;
  avatar: string | null;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface ICocktail {
  _id: string;
  user: User;
  title: string;
  image: string;
  recipe: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  isPublished: boolean;
}

export interface CocktailMutation {
  title: string;
  image: File | null;
  recipe: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  isPublished: boolean;
}
