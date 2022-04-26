import Vuex from "vuex";
const createStore = () => {
  return new Vuex.Store({
    state: () => {
      return {
        baseUrl: '192.168.43.236',
      };
    },

  });
};
export default createStore;
