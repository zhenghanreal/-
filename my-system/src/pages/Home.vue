<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/header.jpg" alt="" />
            <div class="user-info">
              <p class="name">{{username}}</p>
              <p class="job">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2022-11-8</span></p>
            <p>上次登录地点：<span>广州</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 10px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tablelabel"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex' }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="`background:${item.color}`"
            ></i>
            <div class="detail">
              <p class="price">{{ item.value }}</p>
              <p class="content">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 230px">
          <div ref="echarts1" style="height: 230px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 220px">
            <div ref="echarts2" style="height: 220px"></div>
          </el-card>
          <el-card style="height: 220px">
            <div ref="echarts3" style="height: 200px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  name: "Home",
  mounted() {
    this.username = JSON.parse(Cookie.get('username'))
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      //折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      var echarts1Options = {};
      const { orderData, userData,videoData } = data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts1Options.xAxis = xAxisData;
      echarts1Options.yAxis = {};
      echarts1Options.legend = xAxisData;
      echarts1Options.series = [];
      xAxis.forEach((key) => {
        echarts1Options.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      echarts1.setOption(echarts1Options);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Optin = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts2Optin);

      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Optin = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data:videoData,
            type:'pie'
          }
        ],
      };
      echarts3.setOption(echarts3Optin);
    });
  },
  data() {
    return {
      username:'',
      tableData: [],
      tablelabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
};
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #999999;
}
.user img {
  height: 140px;
  margin-right: 20px;
  border-radius: 50px;
}
.name {
  font-size: 32px;
  margin-bottom: 10px;
}
.job {
  color: #999999;
}
.login-info {
  font-size: 12px;
}
.login-info p {
  line-height: 28px;
}
.login-info span {
  margin-left: 30px;
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.num .el-card {
  width: 32%;
  margin-bottom: 10px;
}
.icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  font-size: 32px;
}
.detail {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.price {
  margin: 0;
  margin-bottom: 10px;
  line-height: 18px;
  font-size: 25px;
}
.content {
  margin: 0;
  font-size: 14px;
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.graph .el-card {
  width: 48%;
}
</style>