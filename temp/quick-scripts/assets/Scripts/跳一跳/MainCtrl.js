(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/跳一跳/MainCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eef244TGw9MOJc8N2FmN7IT', 'MainCtrl', __filename);
// Scripts/跳一跳/MainCtrl.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainCtrl = /** @class */ (function (_super) {
    __extends(MainCtrl, _super);
    function MainCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.restartNode = null;
        _this.player = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    //开启遮罩
    MainCtrl.prototype.openRestart = function () {
        this.restartNode.active = true;
        this.player.zIndex = 0;
        this.restartNode.zIndex = 2;
        this.player.getComponent('MonstePhyCtrl').offScreenTouchStart(); //关闭监听
    };
    MainCtrl.prototype.start = function () {
        this.player.getComponent('MonstePhyCtrl').initMainCtrl(this);
    };
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "restartNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "player", void 0);
    MainCtrl = __decorate([
        ccclass
    ], MainCtrl);
    return MainCtrl;
}(cc.Component));
exports.MainCtrl = MainCtrl;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainCtrl.js.map
        