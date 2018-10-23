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
export class Game  extends cc.Component {

    //星星的预制资源
    @property(cc.Prefab)
    private starPrefab : cc.Prefab = null;

    //星星产生后消失时间的随机范围
    @property(cc.Integer)
    private maxStarDuration = 0;
    @property(cc.Integer)
    private minStarDuration = 0;

    //地面节点 用于确定星星生成的高度
    @property(cc.Node)
    private groundNode : cc.Node = null;
    //player 节点，用于获取主角弹跳的高度，和控制主角行动开关
    @property(cc.Node)
    public playerNode : cc.Node = null;

    //score label引用
    @property(cc.Label)
    private scoreLabel : cc.Label = null;

    //的分音效资源
    // @property(cc.AudioClip)
    // private scoreAudio : cc.AudioClip = null;


    //地面节点的y轴坐标
    private groundY: number;
    //定时器
    public timer: number;
    //星星存在的持续时间
    public starDuration: number;
    //当前分数
    private score: number;

    onLoad () {
        //获取地面的y轴坐标
        this.groundY = this.groundNode.y +this.groundNode.height/2;
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        //生成一个新的星星
        // this.spawnNewStar();
        //初始化积分
        this.score = 0 ;
    };

    //spawnNewStar  生成一个新的星星
    public spawnNewStar(){
        //生成一个新的节点
        let newStar=cc.instantiate(this.starPrefab);
        //将新增节点添加到 canvas节点下面
        this.node.addChild(newStar);
        //为星星设置随机位置
        newStar.setPosition(this.getNewStarPosition());
        //// 将 Game 组件的实例传入星星组件
        newStar.getComponent('StarCtrl').init(this);
        //重置计时器
        this.starDuration = this.minStarDuration + Math.random()*(this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }
    //星星的随机位置
    public  getNewStarPosition(){
        let randx = 0 ;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        let randy = this.groundY + Math.random()*this.playerNode.getComponent('PlayerCtrl').jumpHeight
        //根据屏幕宽度，随机得到一个星星的  x  坐标
        let maxX = this.node.width / 2;
        randx = Math.random()*maxX;
        return cc.v2(randx,randy);
    };

    start () {

    }

    update (dt) {
        if(this.timer > this.starDuration){
            // this.gameOver();
            return;
        }
        this.timer += dt;
    }

    //得分
    public gainScore(){
        this.score += 1;
        //更新sorelabel  label的文字
        this.scoreLabel.string = 'Score:'+this.score.toString();
        //播放得分音效
        // cc.audioEngine.play(this.scoreAudio as any,false,1);
    }

    // gg
    private gameOver(){
        this.playerNode.stopAllActions();//停止player节点跳跃的动作
        // cc.director.loadScene('Game');
    }
}
