export interface IRequest {
    q: string,
    latitude: string,
    longitude: string,
    radius?: string,
    sort?: 'name' | 'distance'
}