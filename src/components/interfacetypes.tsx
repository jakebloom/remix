export interface ITrip {
    id: number,
    startTime: number,
    endTime: number,
    selected?: boolean 
}

export interface IBus {
    id?: number,
    trips?: Array<ITrip>
}

export const TRIP_OFFSET = 200
