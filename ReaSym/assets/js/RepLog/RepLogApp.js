import React, {Component} from "react";
import RepLogs from "./RepLogs";
import {getRepLogs, deleteRepLog, createRepLog} from "../api/rep_log_api";


export default class RepLogApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            isLoaded: false,
            isSavingNewRepLog: false,
            successMessage: ''
        };

        this.successMessageTimeoutHandle = 0;

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddRepLog = this.handleAddRepLog.bind(this);
        this.handleDeleteRepLogItem = this.handleDeleteRepLogItem.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then((data) => {
                this.setState({
                    repLogs: data,
                    isLoaded: true
                });
            });
    }

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleRowClick(replogId) {
        this.setState({highlightedRowId: replogId});
    }

    handleAddRepLog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        };

        this.setState({
            isSavingNewRepLog: true,
        });

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {
                        repLogs: newRepLogs,
                        isSavingNewRepLog: false,
                        successMessage: this.setSuccessMessage( 'RepLog added successfully!')
                    }
                })
            });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message

        });

        clearTimeout(this.successMessageTimeoutHandle);
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: ''
            });

            this.successMessageTimeoutHandle = 0;
        }, 3000);
    }

    handleDeleteRepLogItem(id) {
        this.setState((prevState) => {
           return {
               repLogs : prevState.repLogs.map(replog => {
                   if (replog.id !== id) return replog;
                   return Object.assign({}, replog, {isDeleting: true})
               })
           }
        });

        deleteRepLog(id)
            .then(() => {
                this.setState((prevState) => {
                    return {
                        repLogs: prevState.repLogs.filter(repLog => repLog.id !== id)
                    }
                });

                this.setSuccessMessage('Item was Un-Lifted!')
            });


    };

    render() {
        return <RepLogs
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onAddRepLog={this.handleAddRepLog}
            onDeleteRepLog={this.handleDeleteRepLogItem}
        />
    }
}

