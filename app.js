'use strict';
const fs = require("fs");
const readline = require("readline");
const rs = fs.createReadStream("./popu-pref.csv");
const rl = readline.createInterface({
    
    input: rs,
    output: {}

});
const prefectureDataMap = new Map();
let line = 0;
let keys;
rl.on("line", lineString => {
    if (line === 0) {
        keys = lineString.split(",");
    } else {
        let columns = lineString.split(",");
        let year = parseInt(columns[0]);
        let prefecture = columns[1];
        let popu = parseInt(columns[2]) + parseInt(columns[3]);
        if (year === 2010 || year == 2015) {
            let value = prefectureDataMap.get(prefecture);
            if (!value) {
                value = {
                    popu10: 0,
                    popu15: 0,
                    change: null,
                };
            }
            if (year === 2010) {
                value.popu10 = popu;
            } else {
                value.popu15 = popu;
            }
            prefectureDataMap.set(prefecture, value)
        }
    }
    line++;
});
rl.on("close", () => {
    prefectureDataMap.forEach((value) => {
        console.log(value);
        value.change = value.popu15 / value.popu10;
    });
    let ranking = Array.from(prefectureDataMap).sort((o1, o2) => {
        return o2[1].change - o1[1].change;
    });
    console.log(ranking.map(([key, value]) => {
        return `${key}: ${valye.popu10} => ${value.popu15} 変化率: ${value.change}`;
    }));
})
