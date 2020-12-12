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
    }
}

// export default Avatar;