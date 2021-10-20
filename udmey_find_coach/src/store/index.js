import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index';


const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,

    // auth namespaced 沒有使用 true 所以,所有內容都會被賽入root store
    auth: authModule,
  },
});

export default store;