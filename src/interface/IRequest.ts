export interface IRequest {
    q: string,
    latitude: string,
    longitude: string,
    radius?: string,
    sort?: Sort
}

export type Sort = 'name' | 'distance';