// 1.定义一个数组用来存放图片的地址
var arr0 = ['../static/img2/anshu_img.png'];
var arr1 = ["../static/img2/anshu_lable.png"];
var arr2 = ['../static/img2/2019012404DJI_c_0526-13_box_mask_label.jpg'];

// 2.获取一下元素对象
var btns = document.querySelectorAll('button');
var img = document.querySelectorAll('img')[7];


// 创建进度条
var progressBar = document.getElementById('progress-bar');
var progress = document.createElement('div');


// 3.绑定事件
// 原图
btns[0].onclick = function(){
    img.src = arr0;
    console.log(img.src);
}

// 语义分割
btns[1].onclick = function(){

    // 创建进度条
    progress.classList.add('jdt');
    progressBar.appendChild(progress);

    // 创建计时器，规定 n 秒后响应并删除进度条进度
    setTimeout(function() {
        progressBar.removeChild(progress);

        // img对象调用它的src属性，实现改变图片的路径
        img.src = arr1;
        console.log(img.src);

    }, 3000); // 3秒后移除进度条
}

// 目标检测
btns[2].onclick = function(){

    // 创建进度条
    progress.classList.add('jdt');
    progressBar.appendChild(progress);

    // 创建计时器，规定 n 秒后响应并删除进度条进度
    setTimeout(function() {
        progressBar.removeChild(progress);
    
        // img对象调用它的src属性，实现改变图片的路径
        img.src = arr2;
        console.log(img.src);

    }, 3000); // 3秒后移除进度条
}
