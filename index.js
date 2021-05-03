// post : 
/*
    Low : configured in settings how much xp
    medium : configured in settings how much xp
    high : configured in settings how much xp

    Random : with from -> to will give xp between those numbers

    setInStone : an exact number of xp
*/

// Quest ?! im already on a quest. A quest to get my swamp bac

let express = require("express");
let XPEngine = require("./xpEngine");

var xp = new XPEngine();

console.log(xp.randomXp(6,10));
