<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-class="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item v-for="item of noChildren" @click="changRouter(item)" :index="item.path" :key="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item of hasChildren" :index="item.name" :key="item.name">
        <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(subitem, subIndex) of item.children" :key="subitem.path">
            <el-menu-item :index="subIndex.toString()" @click="changRouter(subitem)">{{subitem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
    name: 'CommonAside',
    data() {
      return {
        menu: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
            {
                path: '/mall',
                name: 'mall',
                label: '商品管理',
                icon: 'video-play',
                url: 'MallMange/MallMange'
            },
            {
                path: '/user',
                name: 'user',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage'
            },
            {
                label: '其他',
                name: 'other',
                icon: 'location',
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        label: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne'
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        label: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo'
                    }
                ]
            },
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changRouter(item){
        if (this.$route.name === item.name) return;
       this.$router.push({
        name: item.name
       }) 
       this.$store.commit('selectMenu',item)
      }
    },
    computed: {
        noChildren(){
            return this.menu.filter(item => !item.children)
        },
        hasChildren(){
            return this.menu.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
    },
    mounted() {
        const tagName = this.$store.state.tab.tagList.findIndex(item => item.name === this.$route.name)
        if(tagName === -1){
            const addTag = this.menu.filter(item => item.name == this.$route.name)[0];
            this.$store.state.tab.tagList.push(addTag)
        }
    }
}
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }
  .el-menu{
    height: 100%;
    border: none;
    h3{
        color: white;
        text-align: center;
        line-height: 48px;
    }
  }
</style>