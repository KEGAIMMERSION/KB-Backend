const authRouter = require("express").Router()
const { login }  = require("../controllers/auth")
const { sendMe } = require("../controllers/users")
const { checkAuth } = require("../middlewares/auth")

authRouter.post("/auth/login", login)
authRouter.get("/me", checkAuth, sendMe)

module.exports = authRouter
