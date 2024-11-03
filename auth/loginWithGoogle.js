import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from '../models/User.model.js';
import passport from 'passport';
import dotenv from 'dotenv'
dotenv.config()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            console.log("Profile received", profile.id);
            done(null, {
                id: profile.id
            })
        } catch (err) {
            console.error(`Error in Google OAuth: ${err}`);
            return done(err);
        }
    }

));