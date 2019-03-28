/**
 * @desc 倒计时插件封装
 * @author zb
 */
;(function($) {
    "use strict";

    function CountDown($el, option) {
        this.options = $.extend({}, CountDown.DEFAULT, option);
        this.$el = $el;
        this.timer = null;// 定时器
        this._Init();
    }

    // 默认参数
    CountDown.DEFAULT = {
        tip: '正等待对方银行返回结果...',
        count: 5,
        unit: '秒',
        countDownAnimStart: function() {},
        countDownAnimEnd: function() {},
        countStateChange: function() {}
    }

    CountDown.prototype._Init = function() {
        var data = this.options;
        var tpl = [
            '<div class="wait-wrap">' +
                '<div class="wait-desc">${tip}</div>' +
                '<div class="circle-wrap">' +
                    '<div class="circle-box"></div>' +
                    '<div class="seconds"><span id="circle-count">${count}</span>${unit}</div>' +
                '</div>' +
            '</div>'
        ].join('');
        // juicer模板渲染
        var html = Fw.template(tpl, data);
        this.$el.append(html);
        // 倒计时动画
        this.animStart();
    }

    CountDown.prototype.animStart = function() {
        var _this = this;
        var count = parseInt($("#circle-count").text());

        this.options.countDownAnimStart();// 倒计时开始回调
        $(".circle-wrap").find(".circle-box").addClass("circle-anim");
        _this.timer = setInterval(function() {
            count--;
            _this.options.countStateChange(count);// 倒计时数
            if (count < 1) {
                count = 0;
                clearInterval(_this.timer);
                _this.options.countDownAnimEnd();// 倒计时结束回调
                $(".circle-wrap").find(".circle-box").removeClass("circle-anim");
            }
            $("#circle-count").text(count);
        }, 1000);
    }

    // jQuery插件封装
    $.fn.CountDownComponent = function(option) {
        var $el = $(this),
            options = typeof option === 'object' && option;
        new CountDown($el, options);
    }
})(jQuery);