import { ref } from "vue";

const isPending = ref(false);
const error = ref("");
const data = ref("");

const getAllCountries = async () => {
  isPending.value = true;
  error.value = "";
  try {
    const res = await fetch("https://restcountries.com/v2/all");
    const dataResponse = await res.json();
    data.value = await dataResponse;
    isPending.value = false;
    error.value = "";
  } catch (e) {
    error.value = e.message();
  }
};

const useGetAllCountries = () => {
  return { isPending, error, data, getAllCountries };
};

export default useGetAllCountries;
