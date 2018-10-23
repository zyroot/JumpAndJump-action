(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/跳一跳/FllowCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cc0b1qgaK9D+YZFYpRWSTMr', 'FllowCtrl', __filename);
// Scripts/跳一跳/FllowCtrl.ts

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
var fllowCtrl = /** @class */ (function (_super) {
    __extends(fllowCtrl, _super);
    function fllowCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.distanes_ca_target = 0;
        _this.working = false;
        return _this;
    }
    fllowCtrl.prototype.fllowX = function () {
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0, 0));
        var n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        this.node.x = n_pos.x;
        // var action = cc.moveTo(0.3,cc.v2(n_pos.x+300,this.node.y)).easing(cc.easeCubicActionInOut());
        // var action = cc.moveTo(dt,cc.v2(n_pos.x,this.node.y))
        // this.node.runAction(action);
    };
    fllowCtrl.prototype.fllowY = function () {
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0, 0));
        var n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        var distanes = this.target.y - this.node.y;
        if (distanes > this.distanes_ca_target && !this.working) {
            // this.node.y = n_pos.y;
            this.working = true;
            var action = cc.moveTo(0.3, cc.v2(this.node.x, n_pos.y - 200)).easing(cc.easeCubicActionIn());
            var finishi = cc.callFunc(function () {
                this.working = false;
            }, this);
            this.node.runAction(cc.sequence(action, finishi));
        }
        if (distanes < 0) {
            this.node.y = n_pos.y;
        }
    };
    fllowCtrl.prototype.start = function () {
        this.target.getComponent('MonstePhyCtrl').init(this);
    };
    fllowCtrl.prototype.update = function (dt) {
        this.fllowX();
        this.fllowY();
    };
    __decorate([
        property(cc.Node)
    ], fllowCtrl.prototype, "target", void 0);
    __decorate([
        property(cc.Integer)
    ], fllowCtrl.prototype, "distanes_ca_target", void 0);
    fllowCtrl = __decorate([
        ccclass
    ], fllowCtrl);
    return fllowCtrl;
}(cc.Component));
exports.fllowCtrl = fllowCtrl;

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
        //# sourceMappingURL=FllowCtrl.js.map
        