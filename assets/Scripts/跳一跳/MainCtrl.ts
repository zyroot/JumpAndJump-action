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
export  class MainCtrl extends cc.Component {

    @property(cc.Node)
    restartNode: cc.Node = null;

    @property(cc.Node)
    public player : cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    //开启遮罩
    public openRestart(){
        this.restartNode.active = true;
        this.player.zIndex = 0;
        this.restartNode.zIndex = 2;
        this.player.getComponent('MonstePhyCtrl').offScreenTouchStart();//关闭监听
    }


    start () {
        this.player.getComponent('MonstePhyCtrl').initMainCtrl(this);
    }   

    // update (dt) {}
}
