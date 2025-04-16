export interface RequestResult<T> {
    successful: boolean;
    result: T;
    errors: string[];
}