<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg">
          <div class="userinfo">
            <p class="name" style="font-size: 1.4rem; margin-bottom: 0;">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-7-29</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-table
        :data="tableData"
        style="margin-top: 1rem;">
        <el-table-column
          v-for="(val, key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num" style="display: grid; grid-template-columns: repeat(3,1fr); gap: 10px;">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex',padding: 0,alignItems: 'center'}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="value">￥{{item.value}}</p>
            <p class="name" style="font-size: 12px;color: #999;">￥{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin: 1rem 0;">
        <div style="height: 280px" ref="echarts01">
        
        </div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div style="height: 260px" ref="echarts02">
        
          </div>
        </el-card>
        <el-card style="height:260px">
          <div style="height: 260px" ref="echarts03">
        
          </div>
      </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import {getMenu} from '@/api/data.js'
import {getData} from '@/api/data.js'
import * as echarts from 'echarts'

export default {
    name: 'Home',
    data() {
      return{
        userImg: require('../../assets/img/user.jpg'),
        // tableData: [
        //   {
        //     name: 'oppo',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   },
        //   {
        //     name: 'vivo',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   },
        //   {
        //     name: '苹果',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   },
        //   {
        //     name: '小米',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   },
        //   {
        //     name: '三星',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   },
        //   {
        //     name: '魅族',
        //     todayBuy: 100,
        //     monthBuy: 300,
        //     totalBuy: 800
        //   }
        // ],
        tableData: [],
        tableLabel: {
          name: '课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买'
        },
        countData: [
          {
            name: '今日支付订单',
            value: '1234',
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '今日收藏订单',
            value: '210',
            icon: 'star-on',
            color: '#ffb980'
          },
          {
            name: '今日未支付订单',
            value: '1234',
            icon: 's-goods',
            color: '#5ab1ef'
          },
          {
            name: '本月支付订单',
            value: '210',
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '本月收藏订单',
            value: '210',
            icon: 'star-on',
            color: '#ffb980'
          },
          {
            name: '本月未支付订单',
            value: '1234',
            icon: 's-goods',
            color: '#5ab1ef'
          }
        ]
      }
    },
    created() {
      // this.$axios.get('/user?ID=12345')
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
      // getMenu().then(res =>{
      //   console.log(res);
      // })
      // .catch(error => {
      //   console.log(error)
      // })
      getData().then(res =>{
        const {code, data} = res.data;
        if(code == 20000){
          this.tableData = data.tableData;

          //折线图
          let order = data.orderData;
          let xData = order.date;
          let series = [];
          let keyArray = Object.keys(order.data[0]);
          keyArray.forEach(key => {
            series.push(
              {
                name: key,
                type: 'line',
                data: order.data.map(item => item[key]) 
              }
            )
          });
          const option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: keyArray
            },
            xAxis: {
              data: xData
            },
            yAxis: {},
            series
          };
          const phoneEchart = echarts.init(this.$refs.echarts01)
          phoneEchart.setOption(option)

          //柱状图
          let user = data.userData;
          const user_option = { 
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['新增用户','活跃用户']
            },
            grid: {
              left: '15%'
            },
            xAxis: {
              data: user.map(item => item.date)
            },
            yAxis: {
              axisLine:{
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            },
            color: ['#2ec7c9','#b6a2de'],
            series: [
              {
                name: '新增用户',
                data: user.map(item => item.new),
                type: 'bar',
              },
              {
                name: '活跃用户',
                data: user.map(item => item.active),
                type: 'bar',
              }
            ]
          }
          const user_echarts = echarts.init(this.$refs.echarts02);
          user_echarts.setOption(user_option);
          
          //饼状图
          const video_option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'horizontal',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: data.videoData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          const video_echarts = echarts.init(this.$refs.echarts03)
          video_echarts.setOption(video_option); 
          // console.log(video_echarts);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
}
</script>

<style lang="scss" scoped>
  .el-row{
    .user{
      display: flex;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    img{
      width: 5em;
      height: 5rem;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 1rem;
    }
    i{
      color: white;
      width: 4rem;
      min-height: 4rem;
      font-size: 1.5rem;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph{
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 0 2rem;
    }
  }
</style>