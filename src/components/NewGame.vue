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
                  <div @click="onCellLeftClicked(squareCol)" @click.right="onCellRightClicked(squareCol)">
                        <div class="bombclose" v-show="isValueVisibleAndBomb(squareCol)">{{ squareCol.bombsCloseTo }}</div>
                        <div class="revealed" v-show="isValueVisibleAndFree(squareCol)"></div>
                        <div class="flagged" v-show="isFlagged(squareCol)">"F"</div>
                        <div class="closed" v-show="isClosed(squareCol)"></div> 
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
          this.gameLoaded = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    onCellLeftClicked(squareCol) {
         var data = {
          gameId: this.newGame.gameId,
          rowP: squareCol.rPosition,
          columnP: squareCol.cPosition
        };
        http
        .post("/game/revealSquare", data)
        .then(response => {
          console.log(response.data);
          if(response.data.gameBoard.gameStatus == "FINISHED_LOOSE"){
            this.gameLoaded = false;
            this.newGame = null;
            this.userName = null;
            alert("YOU LOOSE!");
          } else{
            //Reload data
            this.$nextTick().then(() => {
              this.newGame = response.data;
            });
          }
           
            
        })
        .catch(e => {
         alert("Error Found");
        });
    },
    onCellRightClicked(squareCol){
       console.log("Flagged!");
    },
    isValueVisibleAndBomb(squareCol) {
        return (squareCol.opened == true && squareCol.marked == false  && squareCol.bombsCloseTo > 0);
    },
    isValueVisibleAndFree(squareCol) {
        return (squareCol.opened == true && squareCol.marked == false  && squareCol.bombsCloseTo  == 0);
    },
    isFlagged(squareCol) {
        return (squareCol.opened == false && squareCol.marked == true);
    },
    isClosed(squareCol) {
      return (squareCol.opened == false && squareCol.marked == false);
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
    display: table-cell;
    position: relative;
    background-color: rgb(255, 255, 255);
    font-weight: bold;
    width:20px;
    height:20px;
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
.closed {
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
.bombclose{
  font-weight: bold;
}
</style>