import React, {Component} from "react";
import RepLogs from "./RepLogs";
import PropTypes from 'prop-types';
import {v4 as uuid} from 'uuid';


export default class RepLogApp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: uuid(), reps: '15', itemLabel: 'My Laptop', totalWeightLifted: 180},
                {id: uuid(), reps: '15', itemLabel: 'My Cat', totalWeightLifted: 170},
                {id: uuid(), reps: '15', itemLabel: 'My Kitchen', totalWeightLifted: 1180},
            ]
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
    }

    handleRowClick(replogId) {
        this.setState({highlightedRowId: replogId});
    }

    handleAddRepLog(itemLabel, reps) {
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };

        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];

            return {repLogs:newRepLogs}
        })
    }



    render() {
        return <RepLogs
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onAddRepLog={this.handleAddRepLog}
        />
    }
}

