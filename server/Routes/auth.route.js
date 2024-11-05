import express from 'express'
import passport from 'passport'
import jwt from "jsonwebtoken"

const authRouter = express.Router()

//---------------------------------
//-----------GoogleOAuth-----------
//---------------------------------
authRouter.get('/google/login', passport.authenticate("google", {
    scope: ['profile', 'email']
}))

authRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/google/login",
    session: false,
})
    , async (req, res) => {
        const { id, fullName, email, picture } = req.user
        try {
            const token = jwt.sign({ id, fullName, email, picture }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })
            res.redirect('http://localhost:3000/login/success')
        }
        catch (error) {
            return res.status(500).json({ msg: 'Something went wrong oops' })
        }
    }
);

authRouter.get("/verifytoken",
    (req, res) => {
        const token = req.cookies.token || null
        if (!token) {
            return res.status(401).json({
                msg: 'User Not Autherized'
            })
        }
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).send({ msg: 'Server Error' })
        }
    })


authRouter.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        msg: 'User Logged Out Successfully'
    })
})

export default authRouter