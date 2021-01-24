'use strict';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import '../css/main.scss';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
