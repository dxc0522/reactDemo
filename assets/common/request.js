const request = {};
const BaseUrl = "https://www.easy-mock.com/mock/5be143629e70723fe9d8dc42/app/api";
import urls from './urls.js'
request.get = (url, params) => {
    let href = urls[url];
    if (params) {
        href += "?";
        for (let i in params) {
            href = `${href}${i}=${params[i]}&`;
        }
    }
    console.log(BaseUrl + href)
    return new Promise((resolve, reject) => {
        fetch(BaseUrl + href).then(res => {
            const data = JSON.parse(res._bodyText);
            if (data.status == "success" && data.statusCode == "200") {
                resolve(data)
            } else {
                reject(data)
            }
        },
            err => reject(err))
    })
}
request.post = (url, params) => {
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    };
    return new Promise((resolve, reject) => {
        console.log(BaseUrl + urls[url], options)
        fetch(BaseUrl + urls[url], options).then(res => {
            const data = JSON.parse(res._bodyText);
            if (data.status == "success" && data.statusCode == "200") {
                resolve(data)
            } else {
                reject(data)
            }
        },
            err => reject(err))
    })
}
export default request