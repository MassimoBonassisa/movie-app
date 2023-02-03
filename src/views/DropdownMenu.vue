<template>
  <div>
    <select v-model="selectedLanguage" class="bg-red-800 text-stone-300 px-2 py-4 font-semibold text-l" @change="languageChanged">
      <option value="en-US">English</option>
      <option value="it-IT">Italiano</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: "en-US",
      data: {}
    };
  },
  methods: {
    languageChanged () {
        const path = this.$router.currentRoute._value.path;
        this.$router.replace({ path: path, query: { language: this.selectedLanguage }})
    }
  }
};
</script>
