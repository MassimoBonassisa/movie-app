<template>
  <div class="home">
    <h1 class="px-6 py-2 text-2xl text-stone-300 font-semibold">
      Benvenuto su StreamingLover
    </h1>
    <p class="px-6 p-2 text-l text-stone-300 font-semibold">
      Per accedere al nostro infinito catalogo clicca su Film o Serie Tv nella
      barra di navigazione in alto
    </p>
    <br />
    <h1 class="px-6 py-2 text-xl text-stone-300 font-semibold">
      I film che ti consigliamo:
    </h1>
    <div class="overflow-x-scroll home-scroll">
      <div class="flex flex-row flex-nowrap">
        <div
          class="flex flex-col w-auto p-2 shrink-0"
          v-for="film in films"
          :key="film.id"
        >
          <router-link
            id="image"
            :to="{
              name: 'filmDetail',
              params: { id: film.id },
              query: { language: language },
            }"
          >
            <p class="text-base font-semibold px-4 py-2 text-ellipsis">
              {{ film.title }}
            </p>
            <img :src="getPosterPath(film)" class="h-64 w-96 object-cover" />
            <br />
          </router-link>
        </div>
      </div>
    </div>
    <h1 class="px-6 py-2 text-xl text-stone-300 font-semibold">
      Le serie TV che ti consigliamo:
    </h1>
    <div class="overflow-x-scroll home-scroll">
      <div class="flex flex-row flex-nowrap">
        <div
          class="flex flex-col w-auto p-2 shrink-0"
          v-for="tv in tvs"
          :key="tv.id"
        >
          <router-link
            id="image"
            :to="{
              name: 'tvDetail',
              params: { id: tv.id },
              query: { language: language },
            }"
          >
            <p class="text-base font-semibold px-4 py-2 text-ellipsis">
              {{ tv.name }}
            </p>
            <img :src="getPosterPathTvs(tv)" class="h-64 w-96 object-cover" />
          </router-link>
        </div>
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
      tvs: [],
      language: this.$route.query.language
        ? this.$route.query.language
        : "en-US",
    };
  },
  watch: {
    "$route.query.language": {
      handler: function (value) {
        if (value != undefined) {
          this.language = value;
          this.loadElements();
          this.loadElementsTv();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async loadElements() {
      //QUESTO E' IL METODO PER ANDARE AVANTI NELLA FATCH
      console.log('test')
      await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=" +
          this.language +
          "&page=29"
      )
        .then((res) => res.json())
        .then((data) => {
          this.films = data.results;
        });
    },
    getPosterPath(film) {
      return film.backdrop_path === null
        ? "https://image.tmdb.org/t/p/w500/" + film.poster_path
        : "https://image.tmdb.org/t/p/w500/" + film.backdrop_path;
    },

    async loadElementsTv() {
      //QUESTO E' IL METODO PER ANDARE AVANTI NELLA FATCH
      await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=6f9286d54de4891ea7a5c91779e09786&language=" +
          this.language +
          "&page=9"
      )
        .then((res) => res.json())
        .then((data) => {
          this.tvs = data.results;
        });
    },

    getPosterPathTvs(tv) {
      return tv.backdrop_path === null
        ? "https://image.tmdb.org/t/p/w500/" + tv.poster_path
        : "https://image.tmdb.org/t/p/w500/" + tv.backdrop_path;
    },
  },
  mounted() {
    this.loadElements();
    this.loadElementsTv();
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.home-scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.home-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>


