export interface IRequest {
    q: string,
    latitude: number,
    longitude: number,
    radius?: number,
    sort?: 'name' | 'distance'
}