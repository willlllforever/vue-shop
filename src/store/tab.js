export default {
  state: {
    isCollapse: false,
    tagList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  },
  getters: {
  },
  mutations: {
    collapseMenu(state){
       state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val){
      if(val.name !== 'home'){
        state.currentMenu = val;
        const result = state.tagList.findIndex(item => item.name === val.name)
        if(result === -1){
          state.tagList.push(val)
        }
      }
      // state.currentMenu = null;
    },
    removeTag(state, val){
      const result = state.tagList.findIndex(item => item.name === val.name)
      state.tagList.splice( result, 1)
    }
  },
  actions: {
  },
  modules: {
  }
}
