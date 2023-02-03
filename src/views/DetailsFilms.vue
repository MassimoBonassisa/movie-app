<template>
  <div class="details-films">
    <div class="flex-row flex-wrap flex justify-center">
      <div class="rounded-md bg-red-800 p-6 m-1">
        <p class="text-base font-semibold py-2 text-ellipsis">
          {{ film.title }}
        </p>
        <img :src="getPosterPath(film)" class="h-28 w-64 object-cover" />
        <p class="text-m font-semibold py-2">
          {{ film.overview }}
        </p>
        <p class="text-m font-semibold py-2">
          {{ film.genres_name }}
        </p>
        <p class="text-m font-semibold">
          Data di rilascio: {{ film.release_date }}
        </p>
        <p class="text-m font-semibold">
          Lingua originale: {{ film.original_language }}
        </p>
        <p class="text-m font-semibold">
          Valutazione: {{ getRates(film.vote_average) }}
        </p>
        <p class="text-m font-semibold py-2"> Durata: {{ film.runtime }} minuti</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      film: {},
      language: this.$route.query.language ? this.$route.query.language : 'en-US'
    };
  },
  watch: {
    '$route.query.language': {
      handler: function(value) {
        this.language = value;
        this.loadFilm();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async loadFilm() {
      //QUESTO E' IL METODO PER ANDARE AVANTI NELLA FATCH

      await fetch(
        "https://api.themoviedb.org/3/movie/" +
          this.$route.params.id +
          "?api_key=6f9286d54de4891ea7a5c91779e09786&language=" + this.language
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.film = data;
        });
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
    this.loadFilm();
  },
};
</script>