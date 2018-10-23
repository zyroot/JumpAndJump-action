"use strict";
cc._RF.push(module, 'c65a1yDn9ZDQLi3tcFQFLin', 'NpcCtrl');
// Scripts/跳一跳/NpcCtrl.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.namespace = null;
        _this.rigidbody = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    // 只在两个碰撞体开始接触时被调用一次
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        // this.node.stopAllActions();//防止动作重复
        // cc.director.getPhysicsManager().gravity = cc.v2(0,0);
        // this.rigidbody.linearVelocity = cc.v2(0,0);
        if (selfCollider.tag === 31 && otherCollider.tag === 21) { //判断刚体标志 且 没有在跳跃
            console.log("ddd");
            this.rigidbody.applyForceToCenter(cc.v2(0, 10000), true);
            var _self = this;
            this.rigidbody.scheduleOnce(function () {
                _self.rigidbody.applyForceToCenter(cc.v2(0, -10000), true);
            }, 1);
        }
    };
    ;
    NewClass.prototype.start = function () {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        // this.rigidbody.applyForceToCenter(cc.v2(0,-10000),true);
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "namespace", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();