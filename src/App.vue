<template>
    <div id="app" class="container-fluid">
        <div class="site-info">
            <h1>Welcome to</h1>
            <h3>Minesweeper Game</h3>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/startNewGame">New Game</router-link>
            <!-- <router-link class="btn btn-primary" to="/getGame">Resume Game</router-link> -->
        </nav>
        <br/>
        <router-view/>
    </div>
</template>
 
<script>
export default {
  name: "app"
};
</script>
 
<style>
.site-info {
  color: blue;
  margin-bottom: 20px;
}
 
.btn-primary {
  margin-right: 5px;
}
 
.container-fluid {
  text-align: center;
}
</style>
