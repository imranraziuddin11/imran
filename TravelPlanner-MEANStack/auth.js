const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "634197192910-a7j22e0nara5ruu99d9c7eki174kkdhi.apps.googleusercontent.com",
            clientSecret: "OIvBoOmTDAQBAEztOfE9YQeo",
            callbackURL: "/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};