export interface GeoNear {
    near: {
        type: "Point",
        coordinates: [number, number]
    },
    distanceField: "distance"
    maxDistance?:number
}