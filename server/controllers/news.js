//const News = require('../models/newsModel');
//const User = require('../models/userModel');
const helper = require('../helpers/serialize');
const db = require('../models')
require('dotenv').config();
const secret = process.env.SECRET;
const tokens = require('../auth/tokens');

module.exports.get = async (req, res, next) => {
    try {
        const news = await db.getNews()
     return res.json(news)
    } catch (e) {
        next(e)
    }   
}

module.exports.post = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const user = await tokens.getUserByToken(token, db, secret)
        await db.createNews(req.body, helper.serializeUser(user))
        const news = await db.getNews()
        res.json(news)
    } catch (e) {
        next(e)
    }
}

module.exports.patch = async (req, res, next) => {
    try {
        await db.updateNews(req.params.id, req.body)
        const news = await db.getNews()
        res.json(news)
    } catch (e) {
        next(e)
    }
}

module.exports.delete= async (req, res, next) => {
    try {
        await db.deleteNews(req.params.id)
        const news = await db.getNews()
        res.json(news)
    } catch (e) {
        next(e)
    }
}