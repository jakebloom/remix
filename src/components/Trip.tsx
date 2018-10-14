import * as React from "react"

import {ITrip, TRIP_OFFSET} from "./interfacetypes"

type TripProps = ITrip & {onTripClick: (id: number) => void}

export default class Trip extends React.Component<TripProps, {}> {
    render(): React.ReactNode {
        let width:number = this.props.endTime - this.props.startTime
        let cssClass = this.props.selected ? "trip selected" : "trip"
        return (
            <span 
                className={cssClass}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.stopPropagation()
                    this.props.onTripClick(this.props.id)
                }}
                style={{width, left:this.props.startTime + TRIP_OFFSET}}>
                    {this.props.id}
            </span>
        )
    }
}