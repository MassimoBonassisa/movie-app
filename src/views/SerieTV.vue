<template>
  <div class="serie">
    <br />
    <h1 class="px-6 py-2 text-2xl text-stone-300 font-semibold">
      Tutte le nostre serie TV:
    </h1>
    <div class="flex flex-row flex-wrap">
      <div class="basis-1/4" v-for="tv in tvs" :key="tv.id">
        <div class="rounded-md bg-red-800 p-6 m-1">
          <router-link id="image" :to="{ name:'tvDetail', params: { id:tv.id}, query:{language:language} }">
            <p class="text-base font-semibold py-2 text-ellipsis">
              {{ tv.name }}
            </p>
            <img :src="getPosterPath(tv)" class="h-28 w-64 object-cover" />
            <br />
            <p class="text-m font-semibold">
              Prima messa in onda: {{ tv.first_air_date }}
            </p>
            <p class="text-m font-semibold">
              Lingua originale: {{ tv.original_language }}
            </p>
            <p class="text-m font-semibold">
              Valutazione: {{ getRates(tv.vote_average) }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center p-4">
      <div>
        <button @click="loadMore()" class="font-semibold text-stone-300">
          Carica altro
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tvs: [],
      page: 1,
      language: this.$route.query.language ? this.$route.query.language : 'en-US'
    };
  },
  watch: {
    '$route.query.language': {
    handler: function(value) {
    if(value != undefined) {
      this.language = value;
    }
    this.tvs = [];
    this.loadElements();
    },
    deep: true,
    immediate: true
  }
  },
  methods: {
    async loadElements() {
      //QUESTO E' IL METODO PER ANDARE AVANTI NELLA FATCH
      
      await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=" + this.language + "&page=" + 
        this.page
      )
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((element) => {
            this.tvs.push(element);
          });
        });
    },

    loadMore(){
      this.page++;
      this.loadElements();
    },

    getPosterPath(tv) {
      return tv.backdrop_path === null
        ? "https://image.tmdb.org/t/p/w500/" + tv.poster_path
        : "https://image.tmdb.org/t/p/w500/" + tv.backdrop_path;
    },
    getRates(rate) {
      const rateValue = rate / 2;
      return Math.round(rateValue);
    },
  },
  mounted() {
  }
};
</script>

