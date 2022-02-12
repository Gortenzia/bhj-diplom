/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = options.responseType;

    if (options.method === 'GET') {
        let url = options.url;
        if (options.data) {
            url += '?';
            let data = options.data;
            for (let key in data) {
                url += key + '=' + data[key] + '&';
            }
            url = url.trim();
        }

        try {
            if (url) {
                xhr.open(options.method, url, true);
                xhr.send();
            }
        } catch (e) {
            options.callback(e);
        }
    } else {
        let formData = new FormData();

        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }

        try {
            xhr.open(options.method, options.url, true);
            xhr.send(formData);
        } catch (e) {
            options.callback(e);
        }
    }

    xhr.addEventListener('DOMContentLoaded', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let err = null;
            let response = xhr.response;
            options.callback(err, response);
        }
    });

    return xhr;
};
