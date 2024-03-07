import jwt from 'jsonwebtoken';

export const generarJWT = (uid = ' ') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SERCRETEORPRIVATEKEY,
            {
                expiresIn: '2h'
            },
            (err, token) => {
                err ? (console.log(err),reject('Could not generate token')) : resolve(token);
            }
        )
    })
}