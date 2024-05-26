const authRouter = require("express").Router()
const { login }  = require("../controllers/auth")

authRouter.post("/auth/login", login)
authRouter.get("/me", checkAuth, sendMe)

module.exports = authRouter
