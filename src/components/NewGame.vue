<template>
  <div class="submitform">
    <div v-if="!gameLoaded">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" class="form-control" id="name" required v-model="userName" name="name">
        </div>
    
        <button v-on:click="createNewGame" class="btn btn-success">Begginer</button>
    </div>
    <div v-else>
      <div class="row table-board">
        <div>
            <h4>Welcome {{this.userName}}!!!</h4>
              <div>
                <table align="center">
                  <tr v-for="(squareRow, rowKey) in this.newGame.gameBoard.squares" :key="rowKey">
                  <td v-for="(squareCol, colKey) in squareRow" :key="colKey">
                  <div class="cell" @click="onCellLeftClicked(rowKey, colKey)" @click.right="onCellRightClicked(rowKey, colKey)">
                        <div class="content" v-show="isValueVisible(rowKey, colKey)">{{ squareCol.bombsCloseTo }}</div>
                        <div class="flagged" v-show="isFlagged(rowKey, colKey)">"F"</div>
                    </div>
                  </td>
                </tr>
              </table>
             </div>
        </div>
    </div>
    </div>
  </div>
</template>
 
<script>
import http from "../http-common";
 
export default {
  name: "new-minesweeper",
  props: ["game"],
  data() {
    return {
      userName: "",
      newGame : {},
      gameLoaded: false
    };
  },
  methods: {
    createNewGame() {
      var data = {
        name: this.userName
      };
      http
        .post("/game/startNewGame", data)
        .then(response => {
          this.newGame = response.data;
          console.log(this.newGame.gameBoard.squares);
          this.gameLoaded = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onCellLeftClicked(row, col) {
         var data = {
          gameId: this.newGame.gameId,
          rowP: row,
          colP:col
        };
        http
        .post("/game/revealSquare", data)
        .then(response => {
          console.log(response.data);
          //Setting up true for now to see if works
          this.newGame.gameBoard.squares[data.rowP][data.colP].opened=true;
        })
        .catch(e => {
           console.log(e);
         alert("YOU LOOSE!");
          this.gameLoaded = false;
          this.newGame = null;
          this.userName = null;
        });
    },
    onCellRightClicked(row, col){
       console.log("Flagged!");
    },
    isValueVisible(row, col) {
        return this.newGame.gameBoard.squares[row][col].opened == true;
    },
    isFlagged(row, col) {
        return this.newGame.gameBoard.squares[row][col].marked == true;
    }
  }
};
</script>
 
<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
.revealed {
    background-color: #fff;
}
.table {
  border-collapse: collapse;
}

.table, th, td {
  border: 1px solid black;
  width:20px;
  height:20px;
}
.table-board {
  text-align: center;
  max-width: 450px;
  margin: auto;
}
.cell {
    display: table-cell;
    position: relative;
    background-color: #eee;
    font-weight: bold;
    width:20px;
    height:20px;
    border: #ddd 1px solid;
}
.flagged {
    display: table-cell;
    position: relative;
    background-color: #FF0000;
    font-weight: bold;
    width:20px;
    height:20px;
    border: #ddd 1px solid;
}
</style>