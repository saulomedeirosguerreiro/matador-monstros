// import Player from './src/classes/Player';
// import Monster from './src/classes/Monster';

class Avatar {
    constructor(){
        this.actions = [];
        this.life = 100;
    }

    attack(name, opponent, maxForce){
        const damage =  Math.floor(Math.random() * maxForce);
        const action = {
            type:'Attack',
            name,
            opponent,
            damage
        }
        this.actions.push(action);
        return action;
    }

    sufferDamage(damage){
        this.life-=damage;
        if(this.life < 0) this.life = 0;
    }
}

class Monster extends Avatar{
    constructor(){
        super();
       
    }
}

class Player extends Avatar{
    constructor(){
       super();

    }

    specialAttack(name, opponent){
        const damage =  Math.floor(Math.random() * 15);
        const action = {
            type:'Attack',
            name,
            opponent,
            damage
        }
        this.actions.push(action);
        return action;
    }

    heal(name){
        const healing = Math.floor(Math.random() * 10);
        const action = {
            type:'Heal',
            name,
            healing
        }
        this.life+=healing;
        if(this.life > 100) this.life = 100;
        this.actions.push(action);
        return action;
    }
}

new Vue({
    el: '#app',
    data:{
        player: new Player(),
        monster: new Monster(),
        logs:[],
        result:''
    },
    methods:{
        attack(){
           const playerAction = this.player.attack('Ninja Nico', 'Krack', 10);
           this.logs.push(playerAction);
           const monsterAction = this.monster.attack( 'Krack','Nico', 20);
           this.logs.push(monsterAction);

           this.player.sufferDamage(monsterAction.damage)
           this.monster.sufferDamage(playerAction.damage) 
           
           
     
        },
        specialAttack(){
            const playerAction = this.player.specialAttack('Ninja Nico', 'Krack');
            this.logs.push(playerAction);
            const monsterAction = this.monster.attack( 'Krack','Nico', 20);
            this.logs.push(monsterAction);

            this.player.sufferDamage(monsterAction.damage)    
            this.monster.sufferDamage(playerAction.damage) 
        
        },
        heal(){
            const playerAction = this.player.heal('Ninja Nico');
            this.logs.push(playerAction);
            const monsterAction = this.monster.attack( 'Krack','Nico', 20);
            this.logs.push(monsterAction);
        },
        restart(){
            this.player =  new Player(),
            this.monster =  new Monster(),
            this.logs = [],
            this.result = ''
        }

    },
    computed:{
        logsFormatted(){
            return this.logs.map(log => {
                switch(log.type){
                    case 'Attack':
                        return `${log.name} atingiu ${log.opponent} com ${log.damage} pontos`;
                    case 'Heal':
                        return `${log.name} recuperou ${log.healing} de vida`;
                    default: 
                        return 'Tipo de ação não reconhecida';         
                }
            });
        },
        hasLogs(){
            if(this.logs.length > 0) 
                return true;
            return false;
        }

    },
    watch:{
        logs(){
           if(this.logs.length == 10){
               this.logs.splice(0,8);
           }
        },
        player:{
            deep:true,
            handler(){
                if(this.player.life === 0){
                    this.result = 'Jogador perdeu';
                    setTimeout(() => this.restart(),5000);
                }
            }
        },
        monster:{
             deep:true,
             handler(){
                if(this.monster.life === 0){
                    this.result = 'Jogador venceu'; 
                    setTimeout(() => this.restart(),5000);
                }
             }
        }
    }

})