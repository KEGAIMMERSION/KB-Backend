const gamesRouter = require('express').Router()
const {checkAuth} = require("../middlewares/auth")
const {
    findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIsGameExists,
    checkIsVoteRequest
} = require('../middlewares/games')
const {
    sendAllGames,
    sendGameCreated,
    sendGameById,
    sendGameUpdated,
    sendGameDeleted
} = require('../controllers/games')

const { checkIfCategoriesAvaliable } = require("../middlewares/categories")
const  { checkIfUsersAreSafe } = require("../middlewares/users")


gamesRouter.get('/games', findAllGames, sendAllGames)
gamesRouter.post("/games", findAllGames, checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, createGame, sendGameCreated)
gamesRouter.get("/games/:id", findGameById, sendGameById)
gamesRouter.put("/routes/games.js", findGameById, checkIsVoteRequest, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, checkAuth, updateGame, sendGameUpdated)
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted)

module.exports = gamesRouter