import React from 'react';
import RepLogList from "./RepLogList";
import PropTypes from 'prop-types';
import RepLogCreator from "./RepLogCreator";

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let replog of repLogs) {
        total += replog.totalWeightLifted;
    }
    return total;
}

export default function RepLogs({
        highlightedRowId,
        isSavingNewRepLog,
        successMessage,
        itemOptions,
        newRepLopValidationErrorMessage,
        isLoaded,
        repLogs,
        onAddRepLog,
        onDeleteRepLog,
        onRowClick,
    }) {

    return (
        <div className="col-md-7">
            <h2>
                Lift History
            </h2>
            {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
            )}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>What</th>
                    <th>How many times?</th>
                    <th>Weight</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <RepLogList
                    highlightedRowId={highlightedRowId}
                    repLogs={repLogs}
                    onRowClick={onRowClick}
                    onDeleteRepLog={onDeleteRepLog}
                    isLoaded={isLoaded}
                    isSavingNewRepLog={isSavingNewRepLog}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total</th>
                    <th>{calculateTotalWeightLifted(repLogs)}</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>

            <div className="row">
                <div className="col-md-6">
                    <RepLogCreator
                        onAddRepLog={onAddRepLog}
                        onDeleteRepLog={onDeleteRepLog}
                        validationErrorMessage={newRepLopValidationErrorMessage}
                        itemOptions={itemOptions}
                    />
                </div>
            </div>

        </div>
    )
}

RepLogs.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool.isRequired,
    newRepLopValidationErrorMessage: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    itemOptions: PropTypes.array.isRequired
};