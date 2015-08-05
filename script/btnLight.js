/*
* 模块名称 input是否输入，如果输入就点亮提交按钮
* 版本号 1.0.0
* 作者 23
* 邮箱 xiaohuli19920726@163.com
* 备注 目前一个页面只支持一个表单，优化中... 有好的建议或者意见请一定要发我邮箱↑ 感谢
*/
(function(root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function(require, exports, module) {
            return factory(root, exports);
        });
    } else {
        root.btnLight = factory(root);
    }
})(this, function(root, exports) {

    var DUAN = 'data-duan',
        SUBMIT = 'duan-btn-submit',
        DISABLED = 'disabled',
        DISABLEDCLASS = 'duan-disabled';

    var btnLight = function(obj) {
        obj = obj || {};

        this.contain = obj.contain || document;
        this.elmBtn = obj.elmBtn || null;
        this.sClass = DISABLEDCLASS;
        this.oChild=null;

        this.init();
        this.handle();
        btnLight.myConstructor=this;
    };

    btnLight.prototype = {

        constructor: btnLight,

        init: function() {
            var self = this,
                elmBtnOne = self.elmBtn,
                oChild = self._getWants(self.contain,DUAN,'input'),
                i;
            this.oChild = oChild;       //更新child数组

            if (elmBtnOne === null) {
                elmBtnOne = self._getWants(self.contain,SUBMIT,'*')[0];
                self.elmBtn=elmBtnOne;
            }
            if (oChild[0]) {
                for (i = 0; i < oChild.length; i++) {
                    if (!self._eval(oChild[i].getAttribute(DUAN))) {
                        return;
                    } else {
                        elmBtnOne.setAttribute(DISABLED, true);
                        self._addClass(elmBtnOne, self.sClass);
                    }
                }
            }
        },
        handle: function() {
            var self = this,
                oChild = self._getWants(self.contain,DUAN,'input'),
                elmBtnOne = self.elmBtn;

            for (var i = 0, l = oChild.length; i < l; i++) {
                (function(i) {
                    oChild[i].addEventListener('input',self._event.getLight,false);
                }(i));
            }
        },
        _iteration: function(inputArr) {
            var self = this,
                oChild = self._getWants(self.contain,DUAN,'input');
            for (var j = 0, l = oChild.length; j < l; j++) {
                if (!oChild[j].value) {
                    return false;
                }
            }
            return true;
        },
        _eval: function(val) {
            return (new Function("return " + val))();
        },
        _getWants: function(oParent,oWants,tag) {
            var i,
                oEle = oParent.getElementsByTagName(tag),
                aResult = [];
            for (i = 0; i < oEle.length; i++) {

                if (oEle[i].getAttribute(oWants) && this._eval(oEle[i].getAttribute(oWants))) {
                    aResult.push(oEle[i]);
                }

            }
            return aResult;
        },
        _addClass: function(obj, cls) {
            var targetObj = this.isErrorOnParent ? obj.parentElement : obj;
            if (typeof cls == 'string' && targetObj.nodeType === 1) {
                if (!targetObj.className) {
                    targetObj.className = cls;
                } else {
                    var a = (targetObj.className + ' ' + cls).match(/\S+/g);
                    a.sort();
                    for (var i = a.length - 1; i > 0; --i)
                        if (a[i] == a[i - 1]) a.splice(i, 1);
                    targetObj.className = a.join(' ');
                }
            }
        },
        _removeClass: function(obj, cls) {
            var targetObj = this.isErrorOnParent ? obj.parentElement : obj;
            if (targetObj.className && typeof cls === 'string' && targetObj.nodeType === 1) {
                var classArr = targetObj.className.split(' ');
                for (var i = 0, iLength = classArr.length; i < iLength; i++) {
                    if (classArr[i] === cls) {
                        classArr.splice(i, 1);
                    }
                }
                targetObj.className = classArr.join(' ');
            }
        },
        distroy:function(){
            var self = this,
                oChild = self.oChild;
            for(var i=0,l=oChild.length;i<l;i++){
                oChild[i].removeEventListener('input',self._event.getLight,false);
            }
        },
        _event:{
            getLight:function () {
                var self=btnLight.myConstructor;
                if (self._iteration(self.oChild)) {
                    self.elmBtn.removeAttribute(DISABLED);
                    self._removeClass(self.elmBtn, self.sClass);
                } else {
                    self.elmBtn.setAttribute(DISABLED, true);
                    self._addClass(self.elmBtn, self.sClass); 
                }
            }
        }
    };


    return btnLight;
});