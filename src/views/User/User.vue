<template>
  <div class="userform">
    <el-dialog 
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLable"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div class="dialog" slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confrim">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser" style="float: left">新增</el-button>
      <common-form
        :formLabel="searchLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      ></common-form>
      <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
    </div>
    <common-table
      :tableData="tableDate"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue';
import CommonTable from '@/components/CommonTable.vue';
import { getUser } from '@/api/data'
export default {
    name: 'user',
    components: {
      CommonForm,
      CommonTable
    },
    data() {
      return {
        operateType: 'add',
        isShow: false,
        operateFormLable: [
          {
            model: 'name',
            label: '姓名',
            type: 'input'
          },
          {
            model: 'age',
            label: '年龄',
            type: 'input'
          },
          {
            model: 'sex',
            label: '性别',
            type: 'select',
            opts: [
              {
                label: '男',
                value: '1'
              },
              {
                label: '女',
                value: '0'
              }
            ]
          },
          {
            model: 'birth',
            label: '出生日期',
            type: 'date'
          },
          {
            model: 'addr',
            label: '地址',
            type: 'input'
          }
        ],
        operateForm: {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        },
        searchLabel: [
          {
            model: 'keyword',
            label: '',
            type: 'input'
          },
        ],
        searchForm: {
          keyword: ''
        },
        tableDate: [],
        tableLabel: [
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'age',
            label: '年龄'
          },
          {
            prop: 'sexLabel',
            label: '性别'
          },
          {
            prop: 'birth',
            label: '出生日期',
            width: 150
          },
          {
            prop: 'addr',
            label: '地址',
            width: 250
          }
        ],
        config: {
          page: 1,
          total: 30

        }
      }
    },
    methods: {
      confrim() {
        if(this.operateType === 'edit') {
          // this.operateForm.sexLabel = this.operateForm.sex === 0 ? '女' : '男';
          console.log(this.operateForm.sex);
          this.$axios.post('/user/edit', this.operateForm).then(res => {
            console.log(res);
            console.log(this.operateForm.sex);
            this.isShow = false
          });
          this.getList();
        }
        else{
          this.$axios.post('/user/add', this.operateForm).then(res => {
            console.log(res);
            this.isShow = false
          });
          this.getList();
        }
      },
      addUser() {
        this.isShow = true;
        this.operateType = 'add';
        this.operateForm = {
          name: '',
          addr: '',
          age: '',
          birth: '',
          sex: ''
        }
      },
      editUser(row) {
        this.operateType = 'edit'
        this.isShow = true
        this.operateForm = row
        // console.log(row.sexLabel);
        // console.log(row.sex);
        // console.log(row);
      },
      delUser(row) {
        this.$confirm("此操作将永久删除该组件，是否继续？","提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const id = row.id
          // console.log(id);
          this.$axios.post("user/del",{},{
            params: {id}
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getList(name ='') {
        this.config.loading = true;
        name ? (this.config.page = 1) : '';
        getUser({
          page: this.config.page,
          name
        }).then(res => {
          const {data} = res;
          console.log(data);
          this.tableDate = data.list.map(item => {
            item.sexLabel = item.sex == 0 ? '女' : '男';
            return item
          })
          this.config.total = data.count
          this.config.loading = false
        })
      },
    },
    created() {
      this.getList()
    }
}
</script>

<style lang="scss" scoped>
  .manage-header{
    text-align: right;
    form{
      display: inline;
    }
  }
</style>