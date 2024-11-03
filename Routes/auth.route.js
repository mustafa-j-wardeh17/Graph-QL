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
        try {
            const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
            res.cookie('token', token)
            res.redirect('http://localhost:3000/login/success')
        }
        catch (error) {
            return res.status(500).json({ msg: 'Something went wrong oops' })
        }
    }
);


export default authRouter