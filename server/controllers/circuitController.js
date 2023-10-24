require("dotenv").config();
const axios = require("axios");

class circuitRouter {
  static async fetchCircuits(req, res, next) {
    try {
      // console.log("am i here");
      const response = await axios({
        method: "GET",
        url: "https://api-formula-1.p.rapidapi.com/circuits",
        headers: {
          "x-rapidapi-key":
            "2442c0eedbmshe247146069775adp1a3f62jsn7b82af51eac0",
          "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data.response);
    } catch (err) {
      next(err);
    }
  }

  static async fetchCircuitsDetail(req, res, next) {
    try {
      const { circuitId } = req.params;

      const response = await axios({
        method: "GET",
        url: "https://api-formula-1.p.rapidapi.com/circuits",
        params: { id: circuitId },
        headers: {
          "Content-type": "application/json",
          "X-RapidAPI-Key":
            "2442c0eedbmshe247146069775adp1a3f62jsn7b82af51eac0",
          "X-RapidAPI-Host": "api-formula-1.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data.response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = circuitRouter;
