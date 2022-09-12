<template>
    <div class="tag-group">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.name"
            :effect="$route.name == item.name ? 'dark' : 'plain'" 
            :closable="item.name !== 'home'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            size="medium">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'CommonTag',
    computed: {
        ...mapState({
            tags: state => state.tab.tagList
        }),
    },
    methods: {
        ...mapMutations({
            close: 'removeTag'
        }),
        changeMenu(tag) {
            this.$router.push({
                name: tag.name
            }) 
        },
        handleClose(tag, index){
            this.close(tag)
            // this.$store.commit('removeTag',tag);
            let length = this.tags.length;
            if(this.$route.name !== tag.name) {
                return;
            }
            if( index == length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                }) 
            }
            else{
                this.$router.push({
                    name: this.tags[index].name
                }) 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .tag-group{
        padding-bottom: 20px;
        .el-tag{
            margin-right: 10px;
        }
    }
</style>