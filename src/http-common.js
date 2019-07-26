import axios from "axios";
export default axios.create({
  baseURL: "http://minesweeper-mcrespo.herokuapp.com/minesweeper/",
  //baseURL: "http://localhost:8080/minesweeper",
  headers: {
    "Content-type": "application/json",
  }
});