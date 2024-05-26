const games = require("../models/game")

const findAllGames = async (req, res, next) => {
  if(req.query["categories.name"]) { 
    req.gamesArray = await games.findGameByCategory(req.query["categories.name"])
    next()
    return
  }
  req.gamesArray = await games
    .find({})
    .populate("categories")
    .populate({
      path: "users",
      select: "-password"
    })
  next()
}

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next()
}

const createGame = async (req, res, next) => {
  console.log("POST /games")
  try {
    console.log(req.body)
    req.game = await games.create(req.body)
    next()
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }))
  }
}

const findGameById = async(req, res, next) => {
  try{
      req.game = await games.findById(req.params.id).populate("categories").populate({path: "users", select: "-password"})
    next()
  }catch(error) {
    res.setHeader("Content-Type", "application/json")
      res.status(404).send(JSON.stringify({message: "Игра не найдена!"}))
  }
}


const updateGame = async(req, res, next) => {
  try{
      req.game = await games.findByIdAndUpdate(req.params.id, req.body)
    next()
  }catch(error){
    res.setHeader("Content-Type", "application/json")
      res.status(400).send(JSON.stringify({message: "Ошибка в обновлении игры!"}))
  }
}

const deleteGame = async(req, res, next) => {
  try{
      req.game = await games.findByIdAndDelete(req.params.id)
    next()
  }catch(error){
    res.setHeader("Content-Type", "application/json")
      res.status(400).send(JSON.stringify({ message: "Ошибка удаления игры" }))
  }
}

const checkEmptyFields = async(req, res, next) => { 
  if(req.isVoteRequest) {
    next();
    return;
  } 
  if(
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ){
    res.setHeader("Content-Type", "application/json")
      res.status(400).send(JSON.stringify({ message: "Заполни все поля" }))
  } else {
    next()
  }
}

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title
  })
  if (isInArray) {
    res.setHeader("Content-Type", "application/json")
        res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }))
  } else {
    next()
  }
}

module.exports = {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIsGameExists,
  checkIsVoteRequest
}
