<template>
  <div class="details-series">
    <div class="flex-row flex-wrap flex justify-center">
      <div class="rounded-md bg-red-800 p-6 m-1">
        <p class="text-base font-semibold py-2 text-ellipsis">
          {{ tv.name }}
        </p>
        <img :src="getPosterPath(tv)" class="h-28 w-64 object-cover" />
        <p class="text-m font-semibold py-2">
          {{ tv.overview }}
        </p>
        <p class="text-m font-semibold">
          Prima messa in onda: {{ tv.first_air_date }}
        </p>
        <p class="text-m font-semibold">
          Lingua originale: {{ tv.original_language }}
        </p>
        <p class="text-m font-semibold">
          Valutazione: {{ getRates(tv.vote_average) }}
        </p>
        <p class="text-m font-semibold py-2">
          Durata a episodio: {{ tv.episode_run_time }} minuti
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tv: {},
      language: this.$route.query.language ? this.$route.query.language : 'en-US'
    };
  },
  watch: {
    '$route.query.language': {
      handler: function(value) {
        this.language = value;
        this.loadTv();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async loadTv() {
      await fetch(
        "https://api.themoviedb.org/3/tv/" +
          this.$route.params.id +
          "?api_key=6f9286d54de4891ea7a5c91779e09786&language=" + this.language
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.tv = data;
        });
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
    this.loadTv();
  },
};
</script>

