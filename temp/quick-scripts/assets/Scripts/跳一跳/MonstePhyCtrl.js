(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/跳一跳/MonstePhyCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b3e13y15/xBn5xxShxNbfn5', 'MonstePhyCtrl', __filename);
// Scripts/跳一跳/MonstePhyCtrl.ts

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
        //RigidBody 类型
        _this.rigidbody = null;
        //跳跃持续时间
        _this.jumpDuration = 0.7;
        //跳跃高度
        _this.jumpHeight = 200;
        //是否正在跳跃
        _this.isJump = false;
        _this.fllowCtrl = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.init = function (fllowCtrl) {
        this.fllowCtrl = fllowCtrl;
    };
    NewClass.prototype.start = function () {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.rigidbody.applyForceToCenter(cc.v2(0, -100000));
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this); //添加屏幕监听
    };
    ;
    //碰到刚体后 弹跳的动作序列
    NewClass.prototype.setJumpAction = function () {
        //跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //设置0.1秒的延迟  完成平底移动
        var delayaction = cc.delayTime(0.05);
        //向上动作执行完，
        var upovercallback = cc.callFunc(function () {
            // this.rigidbody.applyForceToCenter(cc.v2(0,-20000));//给一个向下的力
        }, this);
        //向下动作执行玩，修改  isjump =false  给向下的力，做动作补偿
        var callback = cc.callFunc(function () {
            this.rigidbody.applyForceToCenter(cc.v2(0, -20000)); //给一个向下的力
            this.isJump = false;
        }, this);
        return cc.sequence(delayaction, jumpUp, upovercallback, jumpDown, callback);
    };
    ;
    // 只在两个碰撞体开始接触时被调用一次
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        this.node.stopAllActions(); //防止动作重复
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        if (selfCollider.tag === 11 && otherCollider.tag === 21 && !this.isJump) { //判断刚体标志 且 没有在跳跃
            this.isJump = true; //跳跃状态改为 true
            this.node.runAction(this.setJumpAction()); //执行动作
            this.rigidbody.linearVelocity = cc.v2(0, 30); //留一点向上的线性速度
        }
        if (selfCollider.tag === 11 && otherCollider.tag === 22) { //判断刚体标志 
            this.rigidbody.linearVelocity = cc.v2(200, 0);
            cc.director.getPhysicsManager().gravity = cc.v2(0, -320);
            this.rigidbody.linearDamping = 1;
        }
    };
    ;
    // 只在两个碰撞体结束接触时被调用一次
    NewClass.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
        this.isJump = false;
        var linev = this.rigidbody.linearVelocity;
        this.rigidbody.linearVelocity = cc.v2(linev.x, 0); //y轴上的线性速度设置为0 关键
    };
    //屏幕点击开始
    NewClass.prototype.onScreenTouchStart = function (event) {
        this.moveLeft();
        if (event.getLocationX() > cc.winSize.width / 2) {
            // this.moveRight();
        }
    };
    NewClass.prototype.moveLeft = function () {
        this.node.stopAllActions(); //停止所有动作
        this.fllowCtrl.fllowY();
        var action = cc.moveBy(0.25, cc.v2(150, 0)).easing(cc.easeCubicActionInOut()); //执行向前动作
        var callf = cc.callFunc(function () {
            this.isJump = false;
            this.rigidbody.applyForceToCenter(cc.v2(0, -30000)); //给一个向下的力
            // cc.director.getPhysicsManager().gravity = cc.v2(0,-420);
        }, this);
        this.node.runAction(cc.sequence(action, callf));
    };
    // 每次将要处理碰撞体接触逻辑时被调用
    NewClass.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
    };
    // 每次处理完碰撞体接触逻辑时被调用
    NewClass.prototype.onPostSolve = function (contact, selfCollider, otherCollider) {
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=MonstePhyCtrl.js.map
        