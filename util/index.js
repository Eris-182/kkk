const { request } = require('express');



let newImageDog = () => {
    return new Promise((resolve, reject) => {
        let url = 'https://random.dog/woof.json';
        request({
            url: url,
            method: 'GET'
        }, (err, res, body) => {

            console.log("Util ảnh chó: " + body)
            if (!err) {
                resolve(body.data.url)
            }
            else {
                console.log(err)
                reject('Lỗi, không lấy được ảnh')
            }
        })
    })
}

let newImageMeo = () => {
    return new Promise((resolve, reject) => {
        let url = 'https://random.dog/woof.json';
        request({
            url: url,
            method: 'GET'
        }, (err, res, body) => {

            console.log("Util ảnh chó: " + body)
            if (!err) {
                resolve(body.data.url)
            }
            else {
                console.log(err)
                reject('Lỗi, không lấy được ảnh')
            }
        })
    })
}

module.exports = {
    newImageDog: newImageDog,
    newImageMeo: newImageMeo
}