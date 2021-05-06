const { test, expect } = require("@jest/globals");
const XPEngine = require("../xpEngine");

test("Check random xp is between highest and lowest", () => {
    var xp = new XPEngine();

    var [low,high] = [5,6];

    var result = xp.randomXp(low,high);
    expect(result).toBeGreaterThanOrEqual(low);
    expect(result).toBeLessThanOrEqual(high);
})

test("Check random xp is between highest and lowest", () => {
    var xp = new XPEngine();

    var [low,high] = [7,7];

    var result = xp.randomXp(low,high);
    expect(result).toBeGreaterThanOrEqual(low);
    expect(result).toBeLessThanOrEqual(high);
})

test("Check random xp is between highest and lowest", () => {
    var xp = new XPEngine();

    var [low,high] = [9,7];

    var result = xp.randomXp(low,high);
    expect(result).toBe(low);
})

test("No input parameter use upto max default xp", () => {
    var xp = new XPEngine();

    var upto = xp.maxXP();

    var result = xp.randomXp();
    console.log(`result : ${result}`);
    expect(result).toBeLessThanOrEqual(upto);
})

test("Class constructor of 0 equals 0", () => {
    var xp = new XPEngine(0);

    var result = xp.randomXp();
    
    console.log(`result : ${result}`);
    expect(result).toBe(0);
})
test("Check random xp random when low is text NaN", () => {
    var xp = new XPEngine();

    var [low,high] = ["Stairs",7];

    var result = xp.randomXp(low,high);
    expect(result).toBeLessThanOrEqual(high);
})
test("Check random xp random when high is text NaN", () => {
    var xp = new XPEngine();

    var [low,high] = [9,"Masters"];

    var result = xp.randomXp(low,high);
    expect(result).toBe(low);
})
test("Check random xp random when low and high is text NaN", () => {
    var xp = new XPEngine();

    var [low,high] = ["Stairs","Masters"];

    var result = xp.randomXp(low,high);
    expect(result).toBe(42);
})

test("Check random xp random when low and high negative number", () => {
    var xp = new XPEngine();

    var [low,high] = ["Stairs","Masters"];

    var result = xp.randomXp(low,high);
    expect(result).toBe(42);
})