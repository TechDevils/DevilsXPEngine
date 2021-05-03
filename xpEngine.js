var DevilDice = require('devildice');
class XPEngine {
    constructor(uptoXP = 10){
        this.maxRandomXP = uptoXP;
    }
    randomXp(from,to){

        if(!from){
            from = 0;
        }
        if(!to){
            to = this.maxRandomXP;
        }
        if(from > to){
            return from;
        }

        return xpBetween(from, to);
    }
    maxXP(){
        return this.maxRandomXP;
    }
}

module.exports = XPEngine;

function xpBetween(from,to){
    var dice = new DevilDice(false);

    var diceSize = ((to - from)+1);

    dice.addDice(diceSize);

    var outcome = dice.roll();
    console.log(`from : ${from} to : ${to} outcome : ${outcome[0][0]}`)

    return (from-1) + outcome[0][0];
}