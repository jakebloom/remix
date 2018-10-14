import * as React from 'react'

import {IBus, ITrip} from './interfacetypes'

import Bus from "./Bus"
import Trip from "./Trip"
import Header from "./Header"

interface IBusObj {[id: number]: IBus}

interface AppProps {
    schedule: Array<ITrip>
}

interface AppState {
    busses: IBusObj,
    selectedTrip?: ITrip,
    selectedTripBusID: number
}

export default class App extends React.Component<AppProps, AppState> {

    componentWillMount(): void {
        let busses: IBusObj = {}
        for (let i: number = 0; i < this.props.schedule.length; i++) {
            busses[i] = {'id': i, 'trips': [this.props.schedule[i]]}
        }
        this.setState({busses, selectedTrip: null, selectedTripBusID: null})
    }

    render(): React.ReactNode {
        let busLanes: Array<React.ReactNode> = Object.keys(this.state.busses).map(
            (_, bus: number) => {
                let trips: Array<ITrip> = this.state.busses[bus].trips.sort((a: ITrip, b: ITrip) => a.startTime - b.startTime)
                let startTime: number = null
                let endTime: number = null

                if (trips.length > 0) {
                    startTime = trips[0].startTime
                    endTime = trips[trips.length - 1].endTime
                }
                return (<Bus key={bus} id={bus} onBusClick={this._onBusClick} startTime={startTime} endTime={endTime}>
                    {this.state.busses[bus].trips.map((t) => 
                        <Trip {...t} onTripClick={this._onTripClick} key={t.id} />)}
                    </Bus>
                )
            }
        )
        busLanes.unshift(<Header schedule={this.props.schedule}/>)
        return busLanes
    }

    _onTripClick = (tripID: number): void => {
        let busses: IBusObj = this.state.busses
        let selectedTrip: ITrip = null
        let selectedTripBusID: number = null
        let busKeys: Array<string> = Object.keys(busses)
        busKeys.map(
            (_, busID: number) => {
                busses[busID].trips.map((trip: ITrip, id: number) => {
                    if (tripID == trip.id && !trip.selected) {
                        busses[busID].trips[id].selected = true
                        selectedTrip = busses[busID].trips[id]
                        selectedTripBusID = busID
                    } else {
                        busses[busID].trips[id].selected = false
                    }
                })
            })
        if (selectedTrip) {
            busses[busKeys.length] = {id: busKeys.length, trips: []}
        } else {
            busses = this._consolidateBusses(busses)            
        }
        this.setState({busses, selectedTrip, selectedTripBusID})
    }

    _onBusClick = (busID?: number): void => {
        if (!this.state.selectedTrip || busID == this.state.selectedTripBusID) {
            return
        }

        if (this._canMove(this.state.selectedTrip, busID)) {
            let trip: ITrip = this.state.selectedTrip
            trip.selected = false

            let busses: IBusObj = this.state.busses
            busses[busID].trips.push(trip)
            busses[this.state.selectedTripBusID].trips = busses[this.state.selectedTripBusID].trips.filter((t: ITrip) => t.id != trip.id)

            busses = this._consolidateBusses(busses)

            this.setState({busses, selectedTrip: null, selectedTripBusID: null})
        }
    }

    _canMove = (trip: ITrip, busID: number): boolean => {
        let trips: Array<ITrip> = this.state.busses[busID].trips
        for (let i: number = 0; i < trips.length; i++) {
            if (
                (trip.startTime >= trips[i].startTime && trip.startTime < trips[i].endTime) ||
                (trip.endTime > trips[i].startTime && trip.endTime <= trips[i].endTime)
            ) {
                return false
            }
        }
        return true
    }

    _consolidateBusses = (busses: IBusObj): IBusObj => {
        let newBusses: IBusObj = {}
        let keys: Array<string> = Object.keys(busses).filter((_, key: number) => busses[key].trips.length != 0)
        for (let i: number = 0; i < keys.length; i++) {
            newBusses[i] = busses[parseInt(keys[i])]
        }
        return newBusses
    }
}