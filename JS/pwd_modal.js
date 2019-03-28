/**
 * @desc 移动端密码框封装
 * @author by zb
 */

;(function($) {
    "use strict";

    function PwdComponent($el, option) {
        this.options = $.extend({}, PwdComponent.DEFAULT, option);
        this.$el = $el;
        (this.options.pwdModalShow || this.options.codeModalShow) && this._Init();
    }

    // 默认参数
    PwdComponent.DEFAULT = {
        pwdModalShow: false,
        codeModalShow: false
    }

    PwdComponent.prototype._Init = function() {
        $("#pwd-component").remove();
        var data = this.options;
        var tpl = [
            '<div id="pwd-component">' +
                '<div id="code-component" class="${codeModalShow ? "code-modal-show" : ""}">' +
                    '<div class="transfer-code-modal">' +
                        '<div class="modal-header border-bottom-1px">' +
                            '<h1>${codeModalTitle}</h1>' +
                            '<div class="close" id="pwd-modal-close"></div>' +
                        '</div>' +
                        '<div class="modal-content">' +
                            '<div class="code-tip">${codeTextTip}</div>' +
                            '<div class="code-wrap">' +
                                '<div class="code-input">' +
                                    '<input type="number" placeholder="请输入验证码"/>' +
                                '</div>' +
                                '<button class="code-resend">重新发送(<span>60</span>)</button>' +
                                '<!-- <button class="code-send">发送验证码</button> -->' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="transfer-modal-mask"></div>' +
                '</div>' +
                
                '<div id="transfer-pwd-modal" class="${pwdModalShow ? "pwd-modal-show" : ""}">' +
                    '<div class="transfer-modal-content">' +
                        '<div class="modal-header border-bottom-1px">' +
                            '<h1>${pwdModalTitle}</h1>' +
                            '<div class="close" id="code-modal-close"></div>' +
                        '</div>' +

                        '<div class="modal-wrap">' +
                            '<div class="txt-wrap">' +
                                '<div class="tip">${transPersonName}</div>' +
                                '<div class="amount">￥<span>${transCount}</span></div>' +
                                '<div class="bank-wrap border-top border-bottom-1px">' +
                                    '<div class="bank-content">' +
                                        '<div class="bank-name">${transBankTip}</div>' +
                                    '</div>' +
                                    '<div class="bank-info">' +
                                        '<div class="bank-act">${transBankAct}</div>' +
                                        '<div class="bank-balance">${transBankBalance}</div>' +
                                     '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div class="pwd-wrapper" id="pwd-wrapper">' +
                                '<div class="pwd-box-item"></div>' +
                                '<div class="pwd-box-item"></div>' +
                                '<div class="pwd-box-item"></div>' +
                                '<div class="pwd-box-item"></div>' +
                                '<div class="pwd-box-item"></div>' +
                                '<div class="pwd-box-item"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="transfer-modal-mask"></div>' +
                '</div>' +
            '</div>' 
        ].join('');
        // juicer模板渲染
        var html = Fw.template(tpl, data);
        this.$el.append(html);
        // 关闭按钮事件监听
        this.bindCloseEvent();
    }

    PwdComponent.prototype.bindCloseEvent = function() {
        $("#pwd-modal-close, #code-modal-close").on("click", function() {
            $("#pwd-component").remove();
        })
    }

    PwdComponent.prototype.ShowPwdPoint = function(n) {
        if (n < 1 || n > 6) return;
        var item = $("#pwd-wrapper").find(".pwd-box-item");
        // 清除所有点
        $(item).removeClass("active");
        // 根据密码长度显示点
        for (var i = 0; i < n; i++) {
            $(item[i]).addClass("active");
        }
    }

    $.fn.PwdModalComponent = function(option) {
        var $el = $(this),
            options = typeof option === 'object' && option;
        return new PwdComponent($el, options);
    }
})(jQuery);