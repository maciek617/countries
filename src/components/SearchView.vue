<template>
  <div class="search_wrapper">
    <div class="search_box">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input type="text" placeholder="Search for a country..." v-model="term" />
    </div>
    <div class="filter_box">
      <div class="filter" @click="show = !show">
        <p>
          Filter by
          {{ select.region }}
        </p>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <div class="filter_select" v-if="show">
        <span
          v-for="region in availableRegions"
          :key="region.region"
          @click="selectRegion(region)"
          >{{ region.region }}</span
        >
      </div>
    </div>
  </div>
  <CountriesList :term="term" :region="select.region" />
</template>

<script>
import { ref } from "vue";
import CountriesList from "@/components/CountriesList";
export default {
  name: "SearchView",
  setup() {
    const select = ref("");
    const term = ref("");
    const availableRegions = ref([
      {
        region: "Africa",
        selected: false,
      },
      {
        region: "America",
        selected: false,
      },
      {
        region: "Asia",
        selected: false,
      },
      {
        region: "Europe",
        selected: false,
      },
      {
        region: "Oceania",
        selected: false,
      },
      {
        region: "All",
        selected: true,
      },
    ]);
    const show = ref(false);

    const selectedRegion = () => {
      select.value = availableRegions.value.find((x) => x.selected);
    };
    selectedRegion();
    const selectRegion = (region) => {
      availableRegions.value.forEach((x) => (x.selected = false));
      region.selected = true;
      selectedRegion();
      show.value = false;
    };
    return {
      availableRegions,
      selectedRegion,
      selectRegion,
      select,
      show,
      term,
    };
  },
  components: { CountriesList },
};
</script>

<style scoped lang="scss">
.search_wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 30px;

  .search_box {
    background-color: var(--light_mode_elements);
    width: 320px;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 0 30px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);

    i {
      color: var(--light_mode_text);
    }

    input {
      background: inherit;
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      margin-left: 20px;
      color: var(--light_mode_text);

      &::placeholder {
        color: grey;
      }
    }
  }

  .filter_box {
    position: relative;
    margin-top: 30px;
    background-color: var(--light_mode_elements);
    color: var(--light_mode_text);
    width: 200px;
    height: 50px;
    border-radius: 4px;
    cursor: pointer;

    .filter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: inherit;
      padding: 0 20px;
    }

    .filter_select {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 10px;
      width: inherit;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--light_mode_elements);
      border-radius: 4px;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
      span {
        padding: 10px 20px;
        cursor: pointer;
        width: 100%;
        text-align: left;

        &:hover {
          background-color: deepskyblue;
        }
      }
    }
  }
}
</style>
