import React from 'react';
import PropTypes from 'prop-types';

export default function RepLogList({highlightedRowId, onRowClick, repLogs}) {

    return (
        <tbody>
        {repLogs.map((replog) => (
            <tr
                key={replog.id}
                className={highlightedRowId === replog.id ? 'info' : ''}
                onClick={() => onRowClick(replog.id)}
            >
                <td>{replog.itemLabel}</td>
                <td>{replog.reps}</td>
                <td>{replog.totalWeightLifted}</td>
                <td>...</td>
            </tr>
        ))}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};