<template>
  <div class="wrapper" v-if="!isPending">
    <TransitionGroup name="list" tag="ul">
      <div
        v-for="country in data"
        :key="country.name"
        class="country"
        :class="
          country.name.toLowerCase().includes(term.toLowerCase()) &&
          country.region.includes(region === 'All' ? '' : region)
            ? 'active'
            : ''
        "
      >
        <router-link
          :to="{ name: 'country', params: { slug: country.alpha3Code } }"
        >
          <div class="country_wrap">
            <img :src="country.flags.png" alt="country flag" />
            <div class="country_deatils">
              <p class="name">{{ country.name }}</p>
              <p>
                <span>Population: </span
                >{{ country.population.toLocaleString() }}
              </p>
              <p><span>Region: </span> {{ country.region }}</p>
              <p><span>Capital: </span>{{ country.capital }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </TransitionGroup>
  </div>
  <LoadingView v-if="isPending" />
</template>

<script>
import useGetAllCountries from "@/composables/getAllCountries";
import { onMounted, ref } from "vue";
import LoadingView from "@/components/LoadingView";

export default {
  name: "CountriesList",
  props: ["term", "region"],
  components: { LoadingView },
  setup() {
    const { data, error, isPending, getAllCountries } = useGetAllCountries();
    onMounted(async () => {
      await getAllCountries();
    });

    const show = ref(false);

    const showCountries = (country, term, region) => {
      if (
        country.name.toLowerCase().includes(term.toLowerCase()) ||
        country.region.includes(region)
      ) {
        show.value = true;
      } else {
        show.value = false;
      }
    };

    return {
      data,
      error,
      isPending,
      getAllCountries,
      showCountries,
      show,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: flex-start;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .country {
    width: 320px;
    margin: 20px;
    background-color: var(--light_mode_elements);
    text-align: left;
    border-radius: 10px;
    cursor: pointer;
    display: none;

    img {
      width: 100%;
      height: 200px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .country_deatils {
      padding: 20px;
      color: var(--light_mode_text);
      .name {
        margin-bottom: 20px;
        font-weight: bold;
      }

      span {
        font-weight: bolder;
      }
    }
  }
  a {
    text-decoration: none;
    color: black;
  }

  .active {
    display: block;
  }

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-leave-active {
    position: absolute;
  }
}
</style>
