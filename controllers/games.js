
const sendAllGames = async (req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(req.gamesArray))
}

const sendUpdatedGames = async(req, res) =>{
    res.send({
        games: req.games,
        updated: req.game
    })
}

const sendGameCreated = async(req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(req.game))
}

const sendGameById = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(req.game))
}

const sendGameUpdated = async(req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify({ message: "Игра обновлена" }))
}

const sendGameDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
}

module.exports = {sendAllGames, sendUpdatedGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted}