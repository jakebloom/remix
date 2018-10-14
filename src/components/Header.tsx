import * as React from "react"

import {ITrip, TRIP_OFFSET} from './interfacetypes'

interface HeaderProps {
    schedule: Array<ITrip>
}

export default class Header extends React.Component<HeaderProps, {}> {
    render(): React.ReactNode {
        let startHour: number = null
        let endHour: number = null
        
        let schedule: Array<ITrip> = this.props.schedule.sort((a, b) => b.endTime - a.endTime)

        if (schedule.length) {
            startHour = 0
            endHour = Math.ceil(schedule[0].endTime / 60)
        }

        if (startHour != null && endHour != null) {
            let intervals: Array<number> = [...Array(endHour - startHour + 1).keys()]
            return (
                <div className="header">
                    {intervals.map((i: number) => 
                        <span className="interval" style={{left:TRIP_OFFSET + i*60}}>
                            {`${i >= 10 ? i : "0" + i}:00`}
                        </span>)}
                </div>
            )
        }

        return <div />
    }
}