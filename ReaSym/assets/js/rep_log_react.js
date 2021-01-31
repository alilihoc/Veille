import React from 'react';
import { render } from 'react-dom';
import RepLogApp from "./RepLog/RepLogApp";

render(
    <RepLogApp
        itemOptions={window.REP_LOG_APP_PROPS.itemOptions}
    />,
    document.getElementById('RepLogApp')
);