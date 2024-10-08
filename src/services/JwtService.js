const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30m' })

    return accessToken
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refreshToken
}

const refreshTokenJwt = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    })
                }
                const { payload } = user
                const access_token = await generalAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token
                })
            })
        }
        catch(e) {
            reject(e)
        }
    })
}


module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwt
}