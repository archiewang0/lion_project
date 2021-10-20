export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },

  shouldUpdate(state){
    const lastFetch = state.lastFetch;
    if(!lastFetch){
      return true
    }
    const currentTimeStamp = new Date().getTime()
    // 將時間給 減去 如果時間大於 一分種 會回傳true
    // 所以將會 reload
    return (currentTimeStamp - lastFetch) / 1000> 60;
  }
};