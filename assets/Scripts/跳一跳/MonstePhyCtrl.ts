// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { fllowCtrl } from './FllowCtrl';
import { MainCtrl } from './MainCtrl';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    //RigidBody 类型
    private rigidbody = null;
    //跳跃持续时间
    private jumpDuration = 0.7;
    //跳跃高度
    private jumpHeight = 200;
    //是否正在跳跃
    private isJump = false;

    private fllowCtrl :fllowCtrl =  null;

    private MainCtrl  : MainCtrl =  null;

    public init(fllowCtrl:fllowCtrl){
        this.fllowCtrl = fllowCtrl;
    }

    public initMainCtrl(MainCtrl:MainCtrl){
        this.MainCtrl = MainCtrl;
    }


    start () {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.rigidbody.linearVelocity = cc.v2(0,-500);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START,this.onScreenTouchStart,this);//添加屏幕监听
    };
    //碰到刚体后 弹跳的动作序列
    private setJumpAction(){
        //跳跃上升
        let jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        let jumpDown = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        //设置0.1秒的延迟  完成平底移动
        let delayaction = cc.delayTime(0.05);
        //变成扁的
        var scaleSamllAction = cc.scaleTo(0.3,0.25);
        //变成圆的
        var scaleBigAction = cc.scaleTo(0.3,0.5);
         //向上动作执行完，
         //向下动作执行玩，修改  isjump =false  给向下的力，做动作补偿
        let callback = cc.callFunc(function(){
            this.rigidbody.linearVelocity  = cc.v2(0,-500);//给一个向下的力
            this.isJump = false;
        },this);
        return cc.sequence(delayaction,jumpUp,jumpDown,callback);
    };

     // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact:cc.PhysicsContact, selfCollider:cc.PhysicsCollider, otherCollider:cc.PhysicsCollider) {
        this.node.stopAllActions();//防止动作重复
        cc.director.getPhysicsManager().gravity = cc.v2(0,0);
        this.rigidbody.linearVelocity = cc.v2(0,0);
        if(selfCollider.tag === 11 && otherCollider.tag === 21 && !this.isJump){//判断刚体标志 且 没有在跳跃
            this.isJump = true;//跳跃状态改为 true
            this.node.runAction(this.setJumpAction());//执行动作
            this.rigidbody.linearVelocity = cc.v2(0,30);  //留一点向上的线性速度
        }
        if(selfCollider.tag === 11 && otherCollider.tag === 22){//判断刚体标志 
            this.rigidbody.linearVelocity = cc.v2(200,0); 
            cc.director.getPhysicsManager().gravity = cc.v2(0,-320);
            this.rigidbody.linearDamping = 1;
        }
        if(selfCollider.tag === 11 && otherCollider.tag === 44){//判断刚体标志 死亡线
            this.rigidbody.fixedRotation = true; 
            this.rigidbody.angularVelocity = 300; 
            this.MainCtrl.openRestart();

        }
    };

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
        this.isJump = false;
        var linev = this.rigidbody.linearVelocity;
        this.rigidbody.linearVelocity = cc.v2(linev.x,0);//y轴上的线性速度设置为0 关键
    }

     //屏幕点击开始
    public onScreenTouchStart(event: cc.Event.EventTouch) {
        this.moveLeft();
        if (event.getLocationX() > cc.winSize.width/2) {
            // this.moveRight();
        }
    }

    public offScreenTouchStart(){
        cc.find("Canvas").off(cc.Node.EventType.TOUCH_START,this.onScreenTouchStart,this);//关闭屏幕监听
    }
    moveLeft(){
        this.node.stopAllActions();//停止所有动作
        this.fllowCtrl.fllowY();
        var action  = cc.moveBy(0.25,cc.v2(150,0)).easing(cc.easeCubicActionInOut());//执行向前动作
        let callf = cc.callFunc(function(){
            this.isJump = false;
            this.rigidbody.linearVelocity= cc.v2(0,-500);//给一个向下的力
            // cc.director.getPhysicsManager().gravity = cc.v2(0,-420);
        },this);
        this.node.runAction(cc.sequence(action,callf));
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact, selfCollider, otherCollider) {
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
    }


    // update (dt) {}
}
