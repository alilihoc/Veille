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
        onRowClick,
        highlightedRowId,
        repLogs,
        onAddRepLog
    }) {

    return (
        <div className="col-md-7">
            <h2>
                Lift History
            </h2>
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

            <RepLogCreator onAddRepLog={onAddRepLog}/>

        </div>
    )
}

RepLogs.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    onAddRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};