// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    //主角跳跃的高度
    @property(cc.Integer)
    private jumpHeight : number = 0 ;
    //主角跳跃的持续时间
    @property(cc.Integer)
    private jumpDuration : number = 0;

    //最大移动速度
    @property(cc.Integer)
    private maxMoveSpeed:number = 0 ;

    //加速度
    @property(cc.Integer)
    private accel: number = 0;

    //跳跃音效
    @property(cc.AudioClip)
    private jumpAudio: cc.AudioClip = null ;

    private xSpeed: number = 0 ; 
    private accLeft: boolean = false;
    private accRight:boolean = false;
    private jumpAction: cc.Action = null;

    private setJumpAction(){
        //跳跃上升
        let jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        //下落
        let jumpDown = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        //添加一个回调函数，用于动作结束时调用我们定义的其他方法
        let callback = cc.callFunc(this.playJumpSound,this);
        //不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown,callback));

    }

    //回调函数  播放声音
    private playJumpSound(){
        // cc.audioEngine.play(this.jumpAudio,false,1);
        cc.audioEngine.playEffect(this.jumpAudio as any, false);
    }

    // 添加事件监听
    private addEventListeners(){
        //键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        //鼠标点击屏幕事件
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_START,this.onScreenTouchStart,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL,this.onScreenTouchEnd,this);
        cc.find("Canvas").on(cc.Node.EventType.TOUCH_END,this.onScreenTouchEnd,this);
    }

    private moveLeft(){
        this.accLeft = true;
        this.accRight = false;
    }

    private moveRight() {
        this.accLeft = false;
        this.accRight = true;
    }

    private stopMove() {
        this.accLeft = false;
        this.accRight = false;
    }

    //屏幕点击结束
    private onScreenTouchEnd() {
        this.stopMove();
    }
      //屏幕点击结束开始
    private onScreenTouchStart(event: cc.Event.EventTouch) {
    
        if (event.getLocationX() > cc.winSize.width/2) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        switch ((event as any).keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.moveLeft();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.moveRight();
                break;
        }
    }

    private onKeyUp(event: cc.Event.EventKeyboard) {
        switch ((event as any).keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.stopMove();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.stopMove();
                break;
        }
    }

    onLoad () {
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
    }

    start () {

    }

    update (dt) {
         // 根据当前加速度方向每帧更新速度
         if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
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
    }
}
