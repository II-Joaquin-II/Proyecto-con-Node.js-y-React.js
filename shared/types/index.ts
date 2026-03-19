export interface User {
    id?: string;
    name: string;
    last_name: string;
    email: string;
    age: number;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}