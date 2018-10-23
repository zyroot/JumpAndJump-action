(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/纯刚体/MonsterMoveCtl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f5983OXQGtIQZlBmf2i6p3o', 'MonsterMoveCtl', __filename);
// Scripts/纯刚体/MonsterMoveCtl.ts

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
        _this.label = null;
        _this.text = 'hello';
        _this.rigidbody = null;
        _this.downOver = true;
        return _this;
    }
    NewClass.prototype.start = function () {
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START, this.touchScreenStart, this);
        this.rigidbody = this.getComponent(cc.RigidBody);
    };
    NewClass.prototype.touchScreenStart = function () {
        this.moveLeft();
    };
    NewClass.prototype.moveLeft = function () {
        // 开启物理步长的设置
        // 开启物理步长的设置
        // var manager = cc.director.getPhysicsManager();
        // manager.enabledAccumulator = true;
        // // 物理步长，默认 FIXED_TIME_STEP 是 1/60
        // manager.FIXED_TIME_STEP = 1/1;
        cc.director.getPhysicsManager().gravity = cc.v2();
        // this.rigidbody.linearVelocity = cc.v2(200,0);
        this.rigidbody.linearVelocity = cc.v2(500, 0);
        this.rigidbody.linearDamping = 5;
        this.downOver = false;
    };
    NewClass.prototype.update = function (dt) {
        if (this.rigidbody.linearVelocity.x === 0 && this.downOver === false) {
            // this.rigidbody.linearDamping = 0;
            this.rigidbody.linearVelocity = cc.v2(0, -320);
        }
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
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
        //# sourceMappingURL=MonsterMoveCtl.js.map
        