export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      // firebase 自己製造id

      // coachId: payload.coachId,
      // coachId 不要存在firebase

      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(`https://udemy-vue-coach-database-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = await response.json();

    if(!response.ok){
      const error = new Error(responseData.message || '發出請求失敗了!');
      throw error;
    }

    console.table(responseData)
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  // 這裡找取firebase 的所有內容
  async fetchRequests(context){
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    
    const response = await fetch(`https://udemy-vue-coach-database-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
    const responseData = await response.json();

    if(!response.ok){
      const error = new Error(responseData.message || '連線需求資料失敗!');
      throw error;
    }

    const requests = [];

    for(const key in responseData){
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request);
    }

    context.commit('setRequests',requests)
  }
};