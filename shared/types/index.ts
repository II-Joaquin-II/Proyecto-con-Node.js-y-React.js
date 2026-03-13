export interface User {
    id?: number;
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