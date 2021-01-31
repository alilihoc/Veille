function fetchJson(url, options) {
    let headers = {
        'Content-Type': 'application/json',
        'X-Csrf-Token': window.CSRF_TOKEN,
    };

    if (options && options.headers) {
        headers = {...options.headers, ...headers};
        delete options.headers;
    }

    return fetch(url, Object.assign({
        credentials: 'same-origin',
        headers: headers,
    }, options))
        .then(checkStatus)
        .then(response => {
            if (response.headers.has('X-CSRF-TOKEN')) {
                window.CSRF_TOKEN = response.headers.get('X-CSRF-TOKEN');
            }

            return response.text()
                .then(text => text ? JSON.parse(text) : '')
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
}

export function getRepLogs() {
    return fetchJson('/reps')
        .then(data => data.items)
}

export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`,{
        method: "DELETE"
    });
}

export function createRepLog(repLog) {{
    return fetchJson(`/reps`,{
        method: "POST",
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
}
}