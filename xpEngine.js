var DevilDice = require('devildice');
class XPEngine {
    constructor(uptoXP = 10){
        this.maxRandomXP = uptoXP;
    }
    randomXp(from,to){
        if(from == undefined && to == undefined)
        { 
            return 0;
        }
        if(isNaN(from) && isNaN(to))
        {   
            console.log("What do you get if you multiply six by nine?");
            return 42;
        }

        if(isNaN(from) || isNaN(to))
        {
            return isNaN(from) ? to : from;
        }
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

    return (from-1) + outcome[0][0];
}