<template>
  <!--  ECharts默认宽高是0，如果不设置页面是不显示的-->
  <div ref="mychart" id="demoDIV"></div>
</template>
    
<script>
// 1:引用echarts
import * as echarts from "echarts";
export default {
  mounted() {
    let myEcharts = echarts.init(this.$refs.mychart);
    // 设置参数
    myEcharts.setOption({
      // echarts标题
      title: {
        text: "项目完成情况",
      },
      // 传入x轴参数
      xAxis: {
        data: ["用户管理", "权限管理", "订单管理", "商品管理"],
      },
      // 传入y轴参数
      yAxis: {},
      // 系列
      series: {
        name: "LOL英雄大全",
        // 设置图表类型
        type: "bar",
        data: [30, 21, 5, 37],
      },
    });
  },
};
</script>
    
<style>
#demoDIV {
  margin: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 500px;
  border: 1px solid rgb(198, 198, 198);
}
</style>
    