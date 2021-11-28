'use strict'
const {arrayBetween, allInOneArray, shuffle} = require('./Utility')

class Generator {

    constructor(len = 10) {
        this.len = len;
        this.rand_in_range = (min, max) => Math.round(Math.random() * (max - min) + min);
        this.combined = shuffle(
            allInOneArray(
                [
                    arrayBetween(65, 90).map(e => String.fromCharCode(e)),
                    arrayBetween(97, 122).map(e => String.fromCharCode(e)),
                    arrayBetween(48, 57).map(e => String.fromCharCode(e)),
                    ["@#=".split('')]
                ]
            )
        )

    }

    visualize(){
        return this.combined;
    }

    generateOfLen(len) {
        let str = '';
        for (let i = 0; i < len; i++) {
            str+=this.combined[this.rand_in_range(0,this.combined.length-1)];
        }
        return str;
    }

    generate() {
        let str = '';
        for (let i = 0; i < this.len; i++) {
            str+=this.combined[this.rand_in_range(0,this.combined.length-1)];
        }
        return str;
    }

    shake(){
        this.combined = shuffle(this.combined);
        return this;
    }

}

module.exports = {Generator};