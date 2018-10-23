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

    @property(cc.Node)
    namespace: cc.Node = null;

    rigidbody:cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:·
    // onLoad () {}

      // 只在两个碰撞体开始接触时被调用一次
      onBeginContact(contact:cc.PhysicsContact, selfCollider:cc.PhysicsCollider, otherCollider:cc.PhysicsCollider) {
        // this.node.stopAllActions();//防止动作重复
        // cc.director.getPhysicsManager().gravity = cc.v2(0,0);
        // this.rigidbody.linearVelocity = cc.v2(0,0);
        if(selfCollider.tag === 31 &&otherCollider.tag === 21){//判断刚体标志 且 没有在跳跃
            this.rigidbody.applyForceToCenter(cc.v2(0,10000),true);
            var _self = this;
            this.rigidbody.scheduleOnce(function(){
                _self.rigidbody.applyForceToCenter(cc.v2(0,-10000),true);
            },1);
        }
    };

    start () {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        // this.rigidbody.applyForceToCenter(cc.v2(0,-10000),true);
    }

    // update (dt) {}
}
