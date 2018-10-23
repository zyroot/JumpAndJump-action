"use strict";
cc._RF.push(module, 'c441av2MbNNwL7IShO9T0lQ', 'GameCtrl');
// Scripts/GameCtrl.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //星星的预制资源
        _this.starPrefab = null;
        //星星产生后消失时间的随机范围
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        //地面节点 用于确定星星生成的高度
        _this.groundNode = null;
        //player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        _this.playerNode = null;
        //score label引用
        _this.scoreLabel = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        //获取地面的y轴坐标
        this.groundY = this.groundNode.y + this.groundNode.height / 2;
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        //生成一个新的星星
        // this.spawnNewStar();
        //初始化积分
        this.score = 0;
    };
    ;
    //spawnNewStar  生成一个新的星星
    Game.prototype.spawnNewStar = function () {
        //生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        //将新增节点添加到 canvas节点下面
        this.node.addChild(newStar);
        //为星星设置随机位置
        newStar.setPosition(this.getNewStarPosition());
        //// 将 Game 组件的实例传入星星组件
        newStar.getComponent('StarCtrl').init(this);
        //重置计时器
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    };
    //星星的随机位置
    Game.prototype.getNewStarPosition = function () {
        var randx = 0;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        var randy = this.groundY + Math.random() * this.playerNode.getComponent('PlayerCtrl').jumpHeight;
        //根据屏幕宽度，随机得到一个星星的  x  坐标
        var maxX = this.node.width / 2;
        randx = Math.random() * maxX;
        return cc.v2(randx, randy);
    };
    ;
    Game.prototype.start = function () {
    };
    Game.prototype.update = function (dt) {
        if (this.timer > this.starDuration) {
            // this.gameOver();
            return;
        }
        this.timer += dt;
    };
    //得分
    Game.prototype.gainScore = function () {
        this.score += 1;
        //更新sorelabel  label的文字
        this.scoreLabel.string = 'Score:' + this.score.toString();
        //播放得分音效
        // cc.audioEngine.play(this.scoreAudio as any,false,1);
    };
    // gg
    Game.prototype.gameOver = function () {
        this.playerNode.stopAllActions(); //停止player节点跳跃的动作
        // cc.director.loadScene('Game');
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "groundNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLabel", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.Game = Game;

cc._RF.pop();