<template>
  <div id="app">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
  </div>
</template>

<script>
    import Header from './components/Header';
    import Footer from './components/Footer';
    export default {
  name: 'app',
    components: {Header, Footer},
    props : {
      message : String
    }
}

</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: white;
    margin: 0 auto !important;
    box-shadow: 0 0 0 lightgrey;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    max-width: 960px !important;
    min-width: 320px !important;
}

.main{
    padding: 0 5px;
}
</style>
