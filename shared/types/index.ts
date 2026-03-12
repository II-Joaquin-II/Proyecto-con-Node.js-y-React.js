export interface User {
    id?: number;
    name: String;
    age: number;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}