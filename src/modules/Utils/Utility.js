const arrayBetween = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx);
const log = (...str) => console.log(...str)
const isValidEmail = s => s.length > 3 && s.includes('@') && s.includes('.') && s.indexOf('@') < s.lastIndexOf('.') && s[s.length - 1] !== '.';
const allInOneArray = arr=> [...arr].flat(Infinity);
const shuffle = arr =>{
    const array = arr;
    let i = array.length - 1;
    while(i>0){
        const j = Math.floor(Math.random() * i);
        [array[i],array[j]] = [array[j],array[i]];
        i--;
    }
    return array;
}
const chatHash = (str1,str2)=>{
    if(str1 === str2){
        return false;
    }
    return `${str1}${str2}`.split('').sort().join('');
}


module.exports = {allInOneArray,isValidEmail,log,arrayBetween, shuffle,chatHash}
