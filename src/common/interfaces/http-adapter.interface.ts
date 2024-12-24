
export interface HttpAdapter {
    // Toda clase que implemente el HttpAdapter debe implementar el metodo get
    get<T>(url: string): Promise<T>;
}