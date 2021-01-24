import React from 'react';
import PropTypes from 'prop-types';

export default function RepLogList({
       highlightedRowId,
       isLoaded,
       isSavingNewRepLog,
       onRowClick,
       onDeleteRepLog,
       repLogs
    }) {

    const handleDeleteRepLog = (event, repLogId) => {
        event.preventDefault();

        onDeleteRepLog(repLogId)
    };

    if (!isLoaded) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center">Loading...</td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
        {repLogs.map((replog) => (
            <tr
                key={replog.id}
                className={highlightedRowId === replog.id ? 'info' : ''}
                onClick={() => onRowClick(replog.id)}
                style={{
                    opacity: replog.isDeleting ? .3 : 1,
                }}
            >
                <td>{replog.itemLabel}</td>
                <td>{replog.reps}</td>
                <td>{replog.totalWeightLifted}</td>
                <td>
                    <a href="#" onClick={(event) => {
                        handleDeleteRepLog(event, replog.id)
                    }}>
                        <span className="fa fa-trash"/>
                    </a>
                </td>
            </tr>
        ))}
        {isSavingNewRepLog && (
            <tr>
                <td
                    colSpan='4'
                    className='text-center'
                    style={{
                        opacity : .4
                    }}
                >
                    Lifting to the database...
                </td>
            </tr>
        )}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewRepLog: PropTypes.bool,
    onRowClick: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired
};