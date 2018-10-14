import * as React from "React"

import Trip from './Trip'

import {ITrip, TRIP_OFFSET} from "./interfacetypes"

interface BusProps {
    id: number,
    startTime?: number,
    endTime?: number,
    onBusClick: (id: number) => void
}

export default class Bus extends React.Component<BusProps, {}> {
    render(): React.ReactNode {
        let time: string = null

        if (this.props.startTime != null && this.props.endTime != null) {
            let startHour: number = Math.floor(this.props.startTime / 60)
            let startMin: number = this.props.startTime % 60
            let endHour: number = Math.floor(this.props.endTime / 60)
            let endMin: number = this.props.endTime % 60

            time = `${startHour}:${startMin >= 10 ? startMin : "0" + startMin} - ${endHour}:${endMin >= 10 ? endMin : "0" + endMin}`
        }
        return (
            <div className="bus" onClick={() => this.props.onBusClick(this.props.id)}>
                <span style={{width: TRIP_OFFSET / 2, fontWeight: 'bold'}}>Bus {this.props.id}</span>
                <span style={{width: TRIP_OFFSET / 2}}>{time}</span>
                {this.props.children}
            </div>
        )
    }
}