define(function (require, exports, module) {

    //引入模块
    var BtnLight = require('btnLight');

    //创建对象
    var btnLight = new BtnLight({
        contain: document.getElementById('abc')
    });
    

    var btn = document.getElementById('bbb');

    //销毁
    btn.onclick = function(){
       btnLight.distroy();
    };
   

});