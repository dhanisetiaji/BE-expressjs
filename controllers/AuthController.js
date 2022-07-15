const { SendEmail } = require("../helpers/welcomemail");
const { reSendEmail } = require("../helpers/resendmail");
const { forgotEmail } = require("../helpers/forgotmail");
const { register, login, verify, reSend, forgotmail, changepassword, refreshToken, verifyToken } = require("../models/Auth");

function randstr(length) {
    let result = '';
    const characters = '012345678910abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const registerUser = async (req, res) => {
    try {
        let code = randstr(20);
        const reqModified = {
            ...req,
            body: {
                ...req.body,
                code,
            }
        };
        const name = `${req.body.firstName} ${req.body.lastName}`
        const sendemail = await SendEmail(req.body.email, name, code);
        if (sendemail) {
            const result = await register(reqModified, res);
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                status: 500,
                message: 'Error!, email not sent',
            });
        }
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const verifyUser = async (req, res) => {
    try {
        const result = await verify(req, res);
        return res.status(200).json(result);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const result = await login(req, res);
        return res.status(200).json(result);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const resendEmail = async (req, res) => {
    try {
        let code = await randstr(20);
        const reqModified = {
            ...req,
            body: {
                ...req.body,
                code,
            }
        };
        const sendemail = await reSendEmail(req.body.email, code);
        if (sendemail) {
            const result = await reSend(reqModified, res);
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                status: 500,
                message: 'Error!, email not sent',
            });
        }
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const forgotMail = async (req, res) => {
    try {
        let code = randstr(20);
        const reqModified = {
            ...req,
            body: {
                ...req.body,
                code,
            }
        };
        const sendemail = await forgotEmail(req.body.email, code);
        if (sendemail) {
            const result = await forgotmail(reqModified, res);
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                status: 500,
                message: 'Error!, email not sent',
            });
        }
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const changePassword = async (req, res) => {
    try {
        const result = await changepassword(req, res);
        return res.status(200).json(result);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const refreshTokenAuth = async (req, res) => {
    try {
        const result = await refreshToken(req, res);
        return res.status(200).json(result);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

const verifyTokenAuth = async (req, res) => {
    try {
        const result = await verifyToken(req, res);
        return res.status(200).json(result);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json(error);
        }
        return res.status(500).json(error);
    }
}

module.exports = {
    registerUser,
    verifyUser,
    loginUser,
    resendEmail,
    forgotMail,
    changePassword,
    refreshTokenAuth,
    verifyTokenAuth,
}