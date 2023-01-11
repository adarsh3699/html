const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { md5Hash, createTokens, verifyAccessToken, verifyLoginInfoToken } = require('../utils');
const User = require('../models/user');

const router = express.Router();
const app = express();

router.get('/', (req, res) => {
    res.send('Hello Settings');
});

//update user profile info
router.post('/update_profile', async (req, res) => {
    const firstName = req.body.firstName ? req.body.firstName.trim() : req.body.firstName;
    const lastName = req.body.lastName ? req.body.lastName.trim() : req.body.lastName;
    const profilePicture = req.body.profilePicture;

    try {
        if (!firstName || !lastName)
            return res.status(404).json({ statusCode: 404, msg: 'Please Provide firstName, lastName' });

        const isAccessTokenValid = verifyAccessToken(req);
        if (isAccessTokenValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
        }

        const userId = isAccessTokenValid?.payload?.userId;
        const email = isAccessTokenValid?.payload?.email;

        if (!userId || !email) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await User.updateOne({ _id: userId, email }, { $set: { firstName, lastName } });

        if (queryResp?.modifiedCount === 0) {
            return res.status(200).json({ statusCode: 200, msg: 'Success' });
        } else {
            const details = { firstName, lastName, profilePicture, email };

            return res.status(200).json({ statusCode: 200, msg: 'Success', details });
        }
    } catch (err) {
        console.log('error in update_profile', err);
        res.status(500).json({ statusCode: 500, msg: 'Something went wrong' });
    }
});

//link password
router.post('/create_password', async (req, res) => {
    const password = req.body.password ? req.body.password.trim() : req.body.password;
    const confPassword = req.body.confPassword ? req.body.confPassword.trim() : req.body.confPassword;
    const loginInfo = req.body.loginInfo ? req.body.loginInfo.trim() : req.body.loginInfo;

    try {
        if (!password || !confPassword || !loginInfo)
            return res.status(404).json({ statusCode: 404, msg: 'Please Provide all Details' });

        if (password !== confPassword) return res.status(403).json({ statusCode: 403, msg: 'Password does not Match' });
        if (password.length < 8)
            return res.status(403).json({ statusCode: 403, msg: 'Password must be at least 8 characters' });

        const isAccessTokenValid = verifyAccessToken(req);
        if (isAccessTokenValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
        }
        const userId = isAccessTokenValid?.payload?.userId;
        const email = isAccessTokenValid?.payload?.email;
        if (!userId || !email) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const isLoginInfoValid = verifyLoginInfoToken(loginInfo);
        if (isLoginInfoValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isLoginInfoValid?.message });
        }
        const linkWithPassword = isLoginInfoValid?.payload?.linkWithPassword;

        if (linkWithPassword === false) {
            const encryptedPassword = md5Hash(password);

            const newLoginInfo = createTokens({
                verified: isLoginInfoValid.payload?.verified,
                linkWithGoogle: isLoginInfoValid.payload?.linkWithGoogle,
                linkWithPassword: true,
            });

            const queryResp = await User.updateOne(
                { _id: userId, email, linkWithPassword: false },
                { $set: { password: encryptedPassword, linkWithPassword: true } }
            );

            return res.status(200).json({ statusCode: 200, loginInfo: newLoginInfo, msg: 'Created Successfully' });
        } else {
            return res.status(400).json({ statusCode: 400, msg: 'Your Account is Already linked with a Password' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 500, msg: 'Something went wrong' });
    }
});

//link google account
router.post('/link_google', async (req, res) => {
    const googleAccessToken = req.body.googleAccessToken;
    const loginInfo = req.body.loginInfo ? req.body.loginInfo.trim() : req.body.loginInfo;

    try {
        if (googleAccessToken && loginInfo) {
            const isAccessTokenValid = verifyAccessToken(req);
            if (isAccessTokenValid?.authorization === false) {
                return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
            }
            const userId = isAccessTokenValid?.payload?.userId;
            const userEmail = isAccessTokenValid?.payload?.email;

            const isLoginInfoValid = verifyLoginInfoToken(loginInfo);
            if (isLoginInfoValid?.authorization === false) {
                return res.status(401).json({ statusCode: 401, msg: isLoginInfoValid?.message });
            }
            const linkWithGoogle = isLoginInfoValid?.payload?.linkWithGoogle;

            axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${req.body.googleAccessToken}`,
                    },
                })
                .then(async (response) => {
                    const firstName = response.data.given_name;
                    const lastName = response.data.family_name;
                    const googleEmail = response.data.email;
                    const picture = response.data.picture;

                    if (userEmail === googleEmail) {
                        if (linkWithGoogle === false) {
                            const newLoginInfo = createTokens({
                                verified: isLoginInfoValid.payload?.verified,
                                linkWithGoogle: true,
                                linkWithPassword: isLoginInfoValid.payload?.linkWithPassword,
                            });

                            const queryResp = await User.updateOne(
                                { _id: userId, email: userEmail, linkWithGoogle: false },
                                { $set: { linkWithGoogle: true, firstName, lastName, picture } }
                            );
                            console.log(queryResp);
                            res.status(200).json({
                                statusCode: 200,
                                loginInfo: newLoginInfo,
                                msg: 'Linked Successfully',
                            });
                        } else {
                            return res
                                .status(400)
                                .json({ statusCode: 400, msg: 'Your Account is Already linked Google' });
                        }
                    } else {
                        res.status(400).json({
                            statusCode: 400,
                            msg: 'Please select the correct email that links to your account.',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ statusCode: 400, msg: 'Invalid access token!' });
                });
        } else {
            res.status(400).json({ statusCode: 400, msg: 'Please Provide all Parameters' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 500, msg: 'Something went wrong!' });
    }
});

//change Password
router.post('/change_password', async (req, res) => {
    const currentPassword = req.body.currentPassword ? req.body.currentPassword.trim() : req.body.currentPassword;
    const newPassword = req.body.newPassword ? req.body.newPassword.trim() : req.body.newPassword;
    const confPassword = req.body.confPassword ? req.body.confPassword.trim() : req.body.confPassword;

    try {
        if (!newPassword || !confPassword || !currentPassword)
            return res.status(404).json({ statusCode: 404, msg: 'Please Provide all Details' });
        if (newPassword !== confPassword)
            return res.status(403).json({ statusCode: 403, msg: 'Password does not Match' });
        if (newPassword.length < 8)
            return res.status(403).json({ statusCode: 403, msg: 'Password must be at least 8 characters' });

        const isAccessTokenValid = verifyAccessToken(req);
        if (isAccessTokenValid?.authorization === false) {
            return res.status(401).json({ statusCode: 401, msg: isAccessTokenValid?.message });
        }
        const userId = isAccessTokenValid?.payload?.userId;
        const email = isAccessTokenValid?.payload?.email;
        if (!userId || !email) return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });

        const queryResp = await User.findOne({ _id: userId, email });

        if (queryResp?.linkWithPassword === true) {
            if (queryResp.password === undefined)
                return res.status(400).json({ statusCode: 400, msg: 'Please Create a Password First' });

            if (md5Hash(currentPassword) === queryResp?.password) {
                const newEncryptedPassword = md5Hash(newPassword);

                const changePasswordQuery = await User.updateOne(
                    { _id: userId, email, linkWithPassword: true },
                    { $set: { password: newEncryptedPassword } }
                );

                return res.status(200).json({ statusCode: 200, msg: 'Password Change Successfully' });
            } else {
                return res.status(401).json({ statusCode: 401, msg: 'Invalid credintials!' });
            }
        } else {
            return res.status(400).json({ statusCode: 400, msg: 'Please Create a Password First' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 500, msg: 'Something went wrong' });
    }
});

module.exports = router;
