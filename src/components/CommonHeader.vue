<template>
    <header>
        <div class="l-content" style="display: flex; align-items:center; gap: 1rem">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tag" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click">
                <img class="userimg" :src="userImg" alt="">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'CommonHeader',
    data(){
        return{
            userImg: require('../assets/img/user.jpg')
        }
    },
    methods: {
        handleMenu(){
            this.$store.commit('collapseMenu')
            console.log(this.tag);
        }
    },
    computed: {
        ...mapState({
            tag: state => state.tab.tagList
        })
    }
}
</script>

<style lang="scss" scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .userimg{
            width: 2.8rem;
            height: 2.8rem;
            object-fit: cover;
            border-radius: 50%;
        }
        h3{
            display: inline-block;
            margin-left: 1rem;
        }
        ::v-deep .el-breadcrumb__inner a, ::v-deep .el-breadcrumb__inner.is-link{
            color: white;
        }
        .el-breadcrumb__item[aria-current="page"] .el-breadcrumb__inner{
            color: #409EFF;
        }
    }

</style>