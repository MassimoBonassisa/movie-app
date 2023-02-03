<template>
  <div>
    <nav class="flex bg-red-800 text-stone-300 px-6 py-2 font-semibold">
      <router-link id="logo" :to="{ name:'home', query:{language:language} }" class="p-3 font-semibold text-xl"
        >StreamingLover</router-link
      >
      <router-link id="logo" :to="{ name:'film', query:{language:language} }" class="p-3 font-semibold text-xl"
      >
        Film</router-link
      >
      <router-link id="logo" :to="{ name:'serie', query:{language:language} }" class="p-3 font-semibold text-xl"
        >Serie TV</router-link
      >
      <DropdownMenu />
    </nav>
    <div class="h-100 p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import DropdownMenu from './views/DropdownMenu.vue'
export default {
  data() {
    return {
      language: this.$route.query.language ? this.$route.query.language : 'en-US'
    };
  },
    components: {
    DropdownMenu
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
