$(function(){
    echart_map();

    function echart_map(){
        //使用echarts.init()方法初始化一个Echarts实例,在init方法中传入echarts map的容器 dom对象
      // mapChart的配置
      var dom = document.getElementById('map');
      var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      var app = {};
      var ROOT_PATH = 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
      var option;
      
      $.getJSON(ROOT_PATH + '/data-gl/asset/data/population.json', function (data) {
      data = data
      .filter(function (dataItem) {
        return dataItem[2] > 0;
      })
      .map(function (dataItem) {
        return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
      });
      myChart.setOption({
      backgroundColor: '#cdcfd5',
      geo3D: {
        map: '广西',
        shading: 'realistic',
      realisticMaterial: {
        roughness: 0.6,
        textureTiling: 20,
        detailTexture: ROOT_PATH + '/data-gl/asset/woods.jpg'
      },
        light: {
          main: {
            intensity: 5,
            shadow: true,
            shadowQuality: 'high',
            alpha: 10
          },
          ambient: {
            intensity: 0
          },
          ambientCubemap: {
            texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
            exposure: 2,
            diffuseIntensity: 1,
            specularIntensity: 1
          }
        },
        
        itemStyle: { // 三维地理坐标系组件 中三维图形的视觉属性,包括颜色,透明度,描边等。
          color: '#66ccff', // 地图板块的颜色
          // color: '#00F6FF',
          opacity: 1, // 图形的不透明度 [ default: 1 ]
          borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
          borderColor: '#A74A11', // 图形描边的颜色。[ default: #333 ]
        }
      ,
        label: { // 标签的相关设置
          show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
          //distance: 50,               // 标签距离图形的距离,在三维的散点图中这个距离是屏幕空间的像素值,其它图中这个距离是相对的三维距离
          //formatter:,               // 标签内容格式器
          textStyle: { // 标签的字体样式
              color: '#000', // 地图初始化区域字体颜色
              fontSize: 12, // 字体大小
              opacity: 1, // 字体透明度
              backgroundColor: 'rgba(0,23,11,0)' // 字体背景色
          },
      },
      
        viewControl: {
          distance: 90,
          center: [2,-20,0],
          panMouseButton: 'left',
          rotateMouseButton: 'right'
        },
        groundPlane: {
          show: true,
          color: '#003377'
        },
        postEffect: {
          enable: true,
          bloom: {
            enable: false
          },
          SSAO: {
            radius: 1,
            intensity: 1,
            enable: true
          },
          depthOfField: {
            enable: false,
            focalRange: 10,
            blurRadius: 10,
            fstop: 1
          }
        },
        temporalSuperSampling: {
          enable: true
        },
        regionHeight: 2
      },
      visualMap: {
        max: 40,
        calculable: true,
        realtime: false,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        },
        outOfRange: {
          colorAlpha: 0
        }
      },
      series: [
        {
          type: 'bar3D',
          coordinateSystem: 'geo3D',
          shading: 'lambert',
          data: [
            { value: [108.320004, 22.82402,40] },
            { value: [109.411703,24.314617,20] },
            { value: [110.299121,25.274215,10] },
            {  value: [111.316229,23.472309,30] },
            {  value: [109.119254,21.473343,20] },
            {  value: [108.345478,21.614631,20] },
            {  value: [108.624175,21.967127,50] },
            { value: [109.602146,23.0936,40] },
            { value: [110.154393,22.63136,20] },
            {  value: [106.616285,23.897742,30] },
            {  value: [	111.552056,24.414141,20] },
            {  value: [108.062105,24.695899,10] },
            {  value: [	109.229772,23.733766,50] },
            {  value: [107.353926,22.404108,30] },
            
            {  value: [108.36694,22.85355,20] },
            {  value: [108.27325,22.78127,30] },
            {  value: [108.31347,22.83386,10] },
            {  value: [108.41284,22.74914,30] },
            {  value: [108.48684,22.75628,30] },
            {  value: [108.27719,23.15643,0] },
            {  value: [109.38548,24.33599,25] },
            {  value: [	109.75177,24.47306,40] },
            {  value: [109.40202,24.36267,20] },
            {  value: [109.38548,24.33599,20] },
      
            {  value: [	110.30195,25.31381,30] },
            {  value: [110.31793,25.2525,16] },
            {  value: [110.67144,25.61167,10] },
            {  value: [107.353926,22.404108,30] },
            {  value: [111.316229,23.472309,22] },
            {  value: [110.91418,23.37605,36] },
            {  value: [	108.38022,21.64342,15] },
            {  value: [109.57224,23.11153,22] },
            {  value: [109.97744,22.27286,33] },
            {  value: [106.41766,23.13425,31] },
      
            {  value: [111.55225,24.41179,30] },
            {  value: [110.81082,24.1701,31] },
            {  value: [108.26055,24.82916,26] },
            {  value: [109.6994,23.97355,18] },
            {  value: [107.19821,22.83412,31] },
            {  value: [	106.75534,22.10573,31] },
      
            {  value: [	109.44293,23.12677,32] },
            {  value: [	110.08105,23.39339,30] },
            {  value: [	110.15114,22.6281,28] },
            {  value: [	110.154393,22.63136,15] },
            {  value: [	110.55593,22.85701,35] },
            {  value: [	106.61764,23.9009,21] },
            {  value: [	107.59045,23.32969,31] },
            {  value: [	105.09722,24.48966,35] },
            {  value: [	108.03727,24.6897,21] },
            {  value: [	107.54562,24.9776,41] },
            {  value: [	107.37527,24.51053,31] },
      
      
      
      
      
          ],
          barSize:0.5,
          minHeight: 0.2,
          silent: true,
          itemStyle: { // 三维地理坐标系组件 中三维图形的视觉属性,包括颜色,透明度,描边等。
            color: 'blue', // 地图板块的颜色
            opacity: 1, // 图形的不透明度 [ default: 1 ]
            borderWidth: 0, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以清晰的区分每个区域
            borderColor: '#A74A11', // 图形描边的颜色。[ default: #333 ]
          },
        }
      ]
      });
      });

    }
  
})