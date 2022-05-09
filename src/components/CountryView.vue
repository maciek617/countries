<template>
  <div class="country_detail_wrapper" v-if="!isPending || show">
    <button @click="goBack">
      <i class="fa-solid fa-arrow-left-long"></i> Back
    </button>
    <div class="wrapper">
      <div class="box_1">
        <img :src="data[0].flags.png" alt="country flag" />
      </div>

      <div class="box_2">
        <div class="box_2_inside">
          <div class="primary_info">
            <h2>{{ data[0].name.common }}</h2>
            <p>
              <span>Native name:</span>
              {{ Object.entries(data[0].name.nativeName)[0][1].common }}
            </p>
            <p>
              <span>Population: </span>{{ data[0].population.toLocaleString() }}
            </p>
            <p><span>Region: </span>{{ data[0].region }}</p>
            <p><span>Sub Region: </span>{{ data[0].subregion }}</p>
            <p><span>Capital: </span>{{ data[0].capital[0] }}</p>
          </div>

          <div class="secondary_info">
            <p><span>Top Level Domain: </span>{{ data[0].tld[0] }}</p>
            <p>
              <span>Currencies: </span
              >{{ Object.entries(data[0].currencies)[0][1].name }}
            </p>

            <p>
              <span>Languages: </span>
              <span
                v-for="lang in Object.values(data[0].languages)"
                :key="lang"
                class="lang"
              >
                {{ lang }},
              </span>
            </p>
          </div>
        </div>

        <div class="third_info">
          <h3>Border Countries:</h3>
          <div class="border_countries">
            <div
              class="border_country"
              v-for="border in data[0].borders"
              :key="border"
            >
              <router-link :to="{ name: 'country', params: { slug: border } }">
                {{ border }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <LoadingView v-if="isPending" />
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import getSingleCountry from "@/composables/getSingleCountry";
import { onMounted, ref, watch } from "vue";
import LoadingView from "@/components/LoadingView";

export default {
  name: "CountryView",
  components: { LoadingView },
  setup() {
    const { isPending, error, data, getCountry } = getSingleCountry();
    const route = useRoute();
    const router = useRouter();
    const show = ref(false);

    onMounted(async () => {
      await getCountry(route.params.slug);
    });

    getCountry(route.params.slug);

    const goBack = () => router.go(-1);

    watch(
      () => route.params.slug,
      async (newSlug) => {
        if (route.path === "/country/" + newSlug) {
          await getCountry(newSlug);
          show.value = true;
        }
      }
    );
    return { isPending, error, data, getCountry, goBack, show };
  },
};
</script>

<style scoped lang="scss">
.country_detail_wrapper {
  text-align: left;
  padding: 20px;
  color: var(--light_mode_text);
  img {
    display: block;
    margin: 40px auto;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
  }

  h3 {
    margin-top: 40px;
  }

  button {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 100px;
    height: 30px;
    border: 0;
    outline: 0;
    background-color: var(--light_mode_elements);
    color: var(--light_mode_text);
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .secondary_info {
    margin-top: 40px;
  }

  .border_countries {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .border_country {
      text-align: center;
      margin: 10px;
      width: 60px;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);

      a {
        text-decoration: none;
        color: var(--light_mode_text);
        background-color: var(--light_mode_elements);
        width: 60px;
        display: block;
      }
    }
  }

  span {
    font-weight: bold;
  }
}

@media screen and (min-width: 1024px) {
  .country_detail_wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;

    img {
      width: 500px;
      height: 300px;
    }

    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      margin: 10px 0;
    }
    h2 {
      margin-bottom: 40px;
      font-size: 2em;
    }
    .box_2 {
      margin-left: 100px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      .box_2_inside {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .secondary_info {
        margin-left: 30px;
      }
    }
  }

  .third_info {
    min-width: 420px;
    max-width: 420px;
  }
}
</style>
