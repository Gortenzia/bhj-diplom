/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest()
    let url = options.url
    const formData = new FormData()
    for (let i in options.data) {
        formData.append(i, options.data[i])
    }

    if (options.method === 'GET') {
        let addUrl
        for (key in options.data) {
            addUrl = key + '=' + options.data[key]
        }
        url += '?' + addUrl
    }

    try {
        xhr.open(options.method, url)
        xhr.responseType = 'json'
        options.method === 'GET' ? xhr.send(options.data) : xhr.send(formData)
    } catch (e) {
        options.callback(new Error(e.message))
    }
    xhr.addEventListener('loadend', () => {
        if (xhr.response.success) {
            options.callback(null, xhr.response)
        } else {
            options.callback(xhr.response.error)
        }
    })
}




//В createRequest попробуйте отдельно выполнять формирование данных для запроса
// от действия отправки запроса(??).То есть, отдельно реализуйте условную конструкцию
//в которой формируйте форму или строку ( if (options.method === 'GET') {let url = options.url} else {let formData = new FormData()} ???)
//(let formData = new FormData() или let url = options.url видимо)
//(в зависимости от метода запроса)(POST и GET).
//В таком случае, конструкцию try / catch не придётся дублировать.