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
export  class fllowCtrl extends cc.Component {

    @property(cc.Node)
    private target:cc.Node = null;

    @property(cc.Integer)
    private distanes_ca_target:number = 0;

    public working = false;

    public fllowX(){
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0,0));
        var n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        this.node.x = n_pos.x;
        // var action = cc.moveTo(0.3,cc.v2(n_pos.x+300,this.node.y)).easing(cc.easeCubicActionInOut());
        // var action = cc.moveTo(dt,cc.v2(n_pos.x,this.node.y))
        // this.node.runAction(action);
    }

    public fllowY(){
        var w_pos = this.target.convertToWorldSpaceAR(cc.v2(0,0));
        var n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        var distanes = this.target.y-this.node.y;
        if( distanes > this.distanes_ca_target && !this.working){
            // this.node.y = n_pos.y;
            this.working = true;
            var action = cc.moveTo(0.3,cc.v2(this.node.x,n_pos.y-200)).easing(cc.easeCubicActionIn());
            let finishi = cc.callFunc(function(){
                this.working = false;
            },this);
            this.node.runAction(cc.sequence(action,finishi));
        }
        if( distanes < 0){
            this.node.y = n_pos.y;
        }
  
    }


    start () {
        this.target.getComponent('MonstePhyCtrl').init(this);
    }

    update (dt) {
        this.fllowX();
        this.fllowY();
    }
}
