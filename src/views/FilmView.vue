<template>
  <div class="film">
    <br />
    <h1 class="px-6 py-2 text-2xl text-stone-300 font-semibold">
      Tutti i nostri film:
    </h1>
    <div class="flex flex-row flex-wrap">
      <div class="basis-1/4" v-for="film in films" :key="film.id">
        <div class="rounded-md bg-red-800 p-6 m-1">
          <router-link id="image" :to="{ name:'filmDetail', params: { id:film.id}, query:{language:language} }">
            <p class="text-base font-semibold py-2 text-ellipsis">
              {{ film.title }}
            </p>
            <img :src="getPosterPath(film)" class="h-28 w-64 object-cover" />
            <br />
            <p class="text-m font-semibold">
              Data di rilascio: {{ film.release_date }}
            </p>
            <p class="text-m font-semibold">
              Lingua originale: {{ film.original_language }}
            </p>
            <p class="text-m font-semibold">
              Valutazione: {{ getRates(film.vote_average) }}
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
      films: [],
      elements: [],
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
      this.films = [];
      this.loadElements();
    },
    deep: true,
    immediate: true
  }
  },
  methods: {
    async loadElements() {
      //QUESTO E' IL METODO PER ANDARE AVANTI NELLA FETCH

      await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=" + this.language +  "&page=" +
          this.page
      )
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((element) => {
            this.films.push(element);
          });
        });
    },

        loadMore(){
      this.page++;
      this.loadElements();
    },

    getPosterPath(film) {
      return film.backdrop_path === null
        ? "https://image.tmdb.org/t/p/w500/" + film.poster_path
        : "https://image.tmdb.org/t/p/w500/" + film.backdrop_path;
    },
    getRates(rate) {
      const rateValue = rate / 2;
      return Math.round(rateValue);
    },
  },
  mounted() {
  },
};
</script>
