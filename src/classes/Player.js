// import Avatar from './Avatar';

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
// export default Player;