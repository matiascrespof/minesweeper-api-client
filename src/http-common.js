import axios from "axios";
export default axios.create({
  baseURL: "https://minesweeper-mcrespo.herokuapp.com/minesweeper/",
  //baseURL: "http://localhost:8080/minesweeper",
  headers: {
    "Content-type": "application/json",
  }
});