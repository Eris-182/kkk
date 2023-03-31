const { request } = require('express');



let newImageDog = () => {
    return Promise((resolve, reject) => {
        let url = 'https://random.dog/woof.json';
        request({
            url: url,
            method: 'GET'
        }, (err, res, body) => {
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
    newImageDog: newImageDog
}