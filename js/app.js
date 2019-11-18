new Vue({
    el:"#app",
    data:{
        playerHealth : 100,
        monsterHealth : 100,
        gameIsRunning : false,
        turns:[],
    },
    methods: {
        startgame : function(){
            this.gameIsRunning = true,
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack:function(){
            var damage = this.calculateDamage(3,10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : "Player Hits Monster For " + damage
            })
            // this.checkWin();
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
            this.checkWin();

        },
        specialAttack:function(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : "Player Hits Monster Hard For " + damage
            })
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
        },
        heal:function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer :true,
                text : "Player Heals For " + 10
            })
            this.monsterAttack();
        },
        giveUp:function(){
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns= [];
        },
        monsterAttack(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer : false,
                text : "Monster Hits Player For " + damage
            })
        },
        calculateDamage : function (min,max){
            return Math.max(Math.floor(Math.random() * max) + 1,min);
        },
        checkWin : function() {
            if(this.monsterHealth <= 0){
                if(confirm("You Won! New Game?")){
                    this.startgame();
                }else{
                    this.gameIsRunning = false;
                    this.turns = [];
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                }
                return true;
            }else if (this.playerHealth <= 0){
                if(confirm("You Lost ? New Game?")){
                    this.startgame();
                }else{
                    this.gameIsRunning = false;
                    this.turns = [];
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                }
                return true;
            }
            return false;
        }
    },
})