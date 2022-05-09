import { ref } from "vue";

const isPending = ref(false);
const error = ref("");
const data = ref("");

const getCountry = async (code) => {
  isPending.value = true;
  error.value = "";
  try {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const dataResponse = await res.json();
    data.value = await dataResponse;
    isPending.value = false;
    error.value = "";
  } catch (e) {
    error.value = e.message();
  }
};

const useGetCountry = () => {
  return { isPending, error, data, getCountry };
};

export default useGetCountry;
