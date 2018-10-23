"use strict";
cc._RF.push(module, 'da773cfL65FcqdMpx6uDcB/', 'PlayerCtrl');
// Scripts/PlayerCtrl.ts

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
        //主角跳跃的高度
        _this.jumpHeight = 0;
        //主角跳跃的持续时间
        _this.jumpDuration = 0;
        //最大移动速度
        _this.maxMoveSpeed = 0;
        //加速度
        _this.accel = 0;
        //跳跃音效
        _this.jumpAudio = null;
        _this.xSpeed = 0;
        _this.accLeft = false;
        _this.accRight = false;
        _this.jumpAction = null;
        return _this;
    }
    NewClass.prototype.setJumpAction = function () {
        //跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        //添加一个回调函数，用于动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        //不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    };
    //回调函数  播放声音
    NewClass.prototype.playJumpSound = function () {
        // cc.audioEngine.play(this.jumpAudio,false,1);
        cc.audioEngine.playEffect(this.jumpAudio, false);
    };
    // 添加事件监听
    NewClass.prototype.addEventListeners = function () {
        //键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        //鼠标点击屏幕事件
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd, this);
    };
    NewClass.prototype.moveLeft = function () {
        this.accLeft = true;
        this.accRight = false;
    };
    NewClass.prototype.moveRight = function () {
        this.accLeft = false;
        this.accRight = true;
    };
    NewClass.prototype.stopMove = function () {
        this.accLeft = false;
        this.accRight = false;
    };
    //屏幕点击结束
    NewClass.prototype.onScreenTouchEnd = function () {
        this.stopMove();
    };
    //屏幕点击结束开始
    NewClass.prototype.onScreenTouchStart = function (event) {
        if (event.getLocationX() > cc.winSize.width / 2) {
            this.moveRight();
        }
        else {
            this.moveLeft();
        }
    };
    NewClass.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.moveLeft();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.moveRight();
                break;
        }
    };
    NewClass.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.stopMove();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.stopMove();
                break;
        }
    };
    NewClass.prototype.onLoad = function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        // 初始化输入监听
        this.addEventListeners();
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.update = function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x <= -this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
        }
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
        }
    };
    __decorate([
        property(cc.Integer)
    ], NewClass.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], NewClass.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], NewClass.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property(cc.Integer)
    ], NewClass.prototype, "accel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], NewClass.prototype, "jumpAudio", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();