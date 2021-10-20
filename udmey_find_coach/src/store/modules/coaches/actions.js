export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://udemy-vue-coach-database-default-rtdb.firebaseio.com//coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
      // 將後面寫的id 給覆蓋過去
    });
  },

  async loadCoaches(context, payload) {

    if(!payload.forceRefresh && !context.getters.shouldUpdate){
      // shouldUpdate true 或是forceRefresh true 會reload
      // shouldUpdate false 或是forceRefresh false 則會執行 return 不會再把新的內容給reload

      // 兩個其中一個符合就可以了
      console.log('沒有reload')

      return;
    }


    const response = await fetch(
      `https://udemy-vue-coach-database-default-rtdb.firebaseio.com//coaches.json`
    );
    const responseData = await response.json();

    console.table(response)

    if (!response.ok) {
      const error = new Error(responseData.message || '連線失敗!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }

    console.log('reload')


    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },

};
