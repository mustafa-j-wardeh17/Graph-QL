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
        const defaultUser = {
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            googleId: profile.id,
            picture: profile.photos[0].value
        }

        try {
            // findOrCreate return array of users so just take user[0]
            const user = await User.findOrCreate({
                where: { googleId: defaultUser.googleId },
                defaults: defaultUser
            })

            if (!user) {
                return done(new Error("something went wrong"), null)
            }

            done(null, user[0])
        } catch (err) {
            console.error(`Error in Google OAuth: ${err}`);
            return done(err);
        }
    }

));