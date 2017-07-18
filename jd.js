/**
 * Created by Administrator on 2017/7/17.
 */
window.onload=function () {
    headerScroll();
    cutDownTime();
    banner();
}
// 顶部固定定位的通栏的背景颜色由透明逐渐变深
function headerScroll() {
    var JDHeader = document.querySelector(".jd_header");
    var JDTopHeight=JDHeader.offsetHeight+JDHeader.offsetTop;
    window.onscroll=function () {
        var scrollHeight=document.body.scrollTop||document.documentElement.scrollTop||window.pageXOffset
        var percent=scrollHeight/JDTopHeight;
        if(percent>1){
            percent=1;
        }
        JDHeader.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
    }
}
// 活动时间倒计时
function cutDownTime() {
   var cutTime=3;
   var tolSecond=cutTime*60*60;
   var liArr=document.querySelectorAll(".jd_main .main_content:first-child .content_top ul li");
   var timer=setInterval(function () {
       if (tolSecond<0){
           clearInterval(timer);
           return;
       }
       tolSecond--;
       var hour=Math.floor(tolSecond/3600);
       var minute=Math.floor(tolSecond%3600/60);
       var second=Math.floor(tolSecond%60);

       liArr[0].innerHTML=Math.floor(hour/10);
       liArr[1].innerHTML=Math.floor(hour%10);
       liArr[3].innerHTML=Math.floor(minute/10);
       liArr[4].innerHTML=Math.floor(minute%10);
       liArr[6].innerHTML=Math.floor(second/10);
       liArr[7].innerHTML=Math.floor(second%10);
   },1000);
}
// 轮播图
// 有BUG最后一张过渡第一张有问题
function banner1() {
    var index=1;
    var width = document.body.offsetWidth;
    var JDBanner=document.querySelector(".jd_banner .banner_images");
    var JDBannerIndex=document.querySelectorAll(".jd_banner .banner_index li");
    JDBanner.style.transition = 'all .3s';
    var timer=setInterval(function () {
        index++;
        if(index>=9){
            index=1;
        }
        JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        for(var i=0;i<JDBannerIndex.length;i++){
            JDBannerIndex[i].className="";
        }
        JDBannerIndex[index-1].className=" current";
    },2000);
}

//index>-9时 关闭过渡 有bug会一直关闭
function banner2() {
    var index=1;
    var width = document.body.offsetWidth;
    var JDBanner=document.querySelector(".jd_banner .banner_images");
    var JDBannerIndex=document.querySelectorAll(".jd_banner .banner_index li");
    JDBanner.style.transition = 'all .3s';
    var timer=setInterval(function () {
        index++;
        if(index>=9){
            index=1;
            JDBanner.style.transition='';
        }
        JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        for(var i=0;i<JDBannerIndex.length;i++){
            JDBannerIndex[i].className="";
        }
        JDBannerIndex[index-1].className=" current";
    },2000);
}
//关闭过渡事件
function banner() {
    var index=1;
    var width = document.body.offsetWidth;
    var JDBanner=document.querySelector(".jd_banner .banner_images");
    var JDBannerIndex=document.querySelectorAll(".jd_banner .banner_index li");
    var timer=setInterval(function () {
        index++;
        JDBanner.style.transition = 'all .3s';
        JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
    },2000);
    JDBanner.addEventListener("webkitTransitionEnd",function () {
        if(index>=9){
            index=1;
            JDBanner.style.transition='';
            JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        }
        for(var i=0;i<JDBannerIndex.length;i++){
            JDBannerIndex[i].className="";
        }
        JDBannerIndex[index-1].className=" current";
    });
    // 三个触摸事件，先定义三个变量用于记录
    var startX=0;
    var moveX=0;
    var distanceX=0;
    JDBanner.addEventListener("touchstart",function (event) {
       console.log(event);
       clearInterval(timer);
       JDBanner.style.transition="";
       startX=event.touches[0].clientX;
    });
    JDBanner.addEventListener("touchmove",function (event) {
        moveX=event.touches[0].clientX-startX;
        JDBanner.style.transform = 'translateX('+(moveX+index*width*-1)+'px)';
    });
    JDBanner.addEventListener("touchend",function (event) {
        distanceX=moveX;
        var maxDistance=width/2;
        if (Math.abs(distanceX)>maxDistance){
            // 判断往左滑还是往右滑
            if(moveX>0){
                index--;
            }else {
                index++;
            }
            JDBanner.style.transition = 'all .3s';
            JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        }else {
            JDBanner.style.transition = 'all .3s';
            JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        }
        timer=setInterval(function () {
           index++;
           JDBanner.style.transition = 'all .3s';
           JDBanner.style.transform = 'translateX('+index*width*-1+'px)';
        },2000);
    });
}