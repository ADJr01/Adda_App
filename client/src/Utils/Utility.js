import {differenceInYears, isExists, parse} from "date-fns";

export const arrayBetween = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx);
export const log = (...str) => console.log(...str)
export const isValidEmail = s => s.length > 3 && s.includes('@') && s.includes('.') && s.indexOf('@') < s.lastIndexOf('.') && s[s.length - 1] !== '.';
export const shuffle = arr => {
    const array = arr;
    let i = array.length - 1;
    while (i > 0) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
        i--;
    }
    return array;
}

export const isValidPassword = password => {
    const pass = password.toString();
    if (pass.length < 4) {
        return false
    }
    return pass.search(/[0-9]/g) > -1 && pass.search(/[A-Z]/g) > -1 && pass.search(/[a-z]/g) > -1
}
export const calcAge = dob => {
    const date = parse(dob, "yyyy-MM-dd", new Date());
    return differenceInYears(new Date(), date);
}

export const dateState = _ => {
    const parseMonth = yy =>
        (yy === 'Jan' && 1) || (yy === 'Feb' && 2) ||
        (yy === 'Mar' && 3) || (yy === 'Apr' && 4) ||
        (yy === 'May' && 5) || (yy === 'Jun' && 6) ||
        (yy === 'Jul' && 7) || (yy === 'Aug' && 8) ||
        (yy === 'Sep' && 9) || (yy === 'Oct' && 10) ||
        (yy === 'Nov' && 11) || (yy === 'Dec' && 12) || -1;
    const date_str = [0, 0, 0];
    const setDate = val => {
        if (typeof val === 'string' && isNaN(parseInt(val[0]))) {
            date_str[1] = parseMonth(val);
        } else if (parseInt(val, 10) > 1000) {
            date_str[0] = parseInt(val, 10);
        } else {
            date_str[2] = parseInt(val, 10);
        }
    }

    const isValidDate = _ => isExists(date_str[0], date_str[1], date_str[2]);
    const getDate = (asSTR = true) => asSTR ? date_str.join('-') : date_str;
    return {setDate, isValidDate, getDate}

}


