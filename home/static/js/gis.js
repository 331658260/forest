var map;
var zoom = 15;
var center;
var localsearch;
var radius = 5000;
var markers = []; // 存储标注点的数组
var infoWins = []; // 存储信息窗口的数组
var lineTool

function onLoad() {
    //初始化地图对象
    map = new T.Map("gis");
    //设置显示地图的中心点和级别
    map.centerAndZoom(new T.LngLat(108.145990,22.860600), zoom);
    //创建缩放平移控件对象
    control = new T.Control.Zoom();
    //添加缩放平移控件
    map.addControl(control);

    //鹰眼控件
    var miniMap = new T.Control.OverviewMap({
        isOpen: true,
        size: new T.Point(300, 300)
    });
    map.addControl(miniMap);

    //添加地图类型控件
    var ctrl = new T.Control.MapType();
    map.addControl(ctrl);

    //添加创建标注工具对象控件
    var config = {
        showLabel: true
    };
    lineTool = new T.PolylineTool(map, config);

    //创建比例尺控件对象
    var scale = new T.Control.Scale();
    //添加比例尺控件
    map.addControl(scale);

    var cp = new T.CoordinatePickup(map, {callback: getLngLat})
    cp.addEvent();

    //添加自定义覆盖物
    var bd = new T.LngLatBounds(
        new T.LngLat(108.145990,22.860600),
        new T.LngLat(108.185990,22.920600));
    img = new T.ImageOverlay("../static/img2/output.png", bd, {
        opacity: 1,
    });
    add_overlay();

    newControl = new T.Control({position: T_ANCHOR_TOP_LEFT});
            newControl.onAdd = function (map) {
                var container = document.createElement("div");
                container.style.display = "flex"; // 使用Flex布局
                container.style.flexDirection = "column"; // 垂直排列
                var sOcsstext = "font-size:15px;border:solid 1px rgba(192,192,192, 0.5);background:#fff;padding:10px;line-height:15px;cursor:pointer;font-weight: bold; color: black;";
                var hOcsstext = "font-size:15px;border:solid 1px rgba(192,192,192, 0.5);background:#fff;padding:10px;line-height:15px;cursor:pointer;font-weight: bold; color: black;";
                this.showOverButton = createButton("显示", "显示覆盖物", 'a', container, sOcsstext);
                this.hideOverButton = createButton("隐藏", "隐藏覆盖物", 'b', container, hOcsstext);
                this.showOverButton.onclick = showOver;
                this.hideOverButton.onclick = hideOver;
                this.showOverButton.style.marginBottom = "0px"; // 5px间距
                this.hideOverButton.style.marginBottom = "5px"; // 5px间距
                return container;
            };

            newControl.onRemove = function (map) {
                //移除控件时要释放
                delete  this.showOverButton;
                delete  this.hideOverButton;
            }

            map.addControl(newControl);
    }

    //添加覆盖物
    function add_overlay(){
      map.addOverLay(img); 
    }
    
    function showOver(){
        img.show()
    }
    
    function hideOver(){
        img.hide()
    }


    function createButton(html, title, className, container, csstext) {
        var link = document.createElement("a");
        if (container) {
            container.appendChild(link);
        }
        link.innerHTML = html;
        link.title = title;
        link.style.cssText = csstext;
        return link;
    }

// 创建标注和信息窗口
function createMarkerAndInfoWindow(lnglat, name, address, imageUrl) {
    var marker = new T.Marker(lnglat);
    var infoWin = new T.InfoWindow();

    var content =
        "<div class='custom-info-window'>" +
        "<img src='" + imageUrl + "'/>" +
        "<div class='custom-info-window-content'>" +
        "<strong>" + name + "</strong><br>" +
        "地址: " + address +
        "</div>" +
        "</div>";

    infoWin.setContent(content);

    marker.addEventListener("click", function () {
        marker.openInfoWindow(infoWin);
    });

    markers.push(marker);
    infoWins.push(infoWin);


}

//解析点数据结果
function pois(obj) {
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            //闭包
            (function (i) {
                //名称
                var name = obj[i].name;
                //地址
                var address = obj[i].address;
                //坐标
                var lnglatArr = obj[i].lonlat.split(" ");
                var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
                //图片链接
                var imageUrl = obj[i].imageUrl;

                // 创建标注和信息窗口
                createMarkerAndInfoWindow(lnglat, name, address, imageUrl);
            })(i);
        }
    }
}

function ControlsetPosition() {
    var selectNavPosition = document.getElementById("selectnavposition");
    var index = selectNavPosition.selectedIndex;
    var controlPositionStr = selectNavPosition.options[index].value;
    this.leftTOP = T_ANCHOR_TOP_LEFT;
    var controlPosition;
    controlPosition = T_ANCHOR_TOP_LEFT;
  
    control.setPosition(controlPosition);
}


function getLngLat(lnglat) {
    document.getElementById("lnglatStr").value = lnglat.lng.toFixed(6) + "," + lnglat.lat.toFixed(6);
}