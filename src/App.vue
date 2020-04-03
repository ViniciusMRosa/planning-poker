<template>
  <div id="app">
    <div class="menu">
      <span class="logo">Planning Poker Easy</span>
    </div>
    <router-view class="content" />
    <footer>
      <div class="version">by Contábil CA+ Financeiro</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
