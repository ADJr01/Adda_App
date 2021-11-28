const {createHash,timingSafeEqual,createHmac:hmessage} = require('crypto');
const base_64 = _=>{
    let g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let i = ">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";

    function h(a) {
        a = a.charCodeAt(0) << 16 | a.charCodeAt(1) << 8 | a.charCodeAt(2);
        return String.fromCharCode(g.charCodeAt(a >>> 18), g.charCodeAt(a >>> 12 & 63), g.charCodeAt(a >>> 6 & 63), g.charCodeAt(a & 63))
    }
    function j(a) {
        a = i.charCodeAt(a.charCodeAt(0) - 43) << 18 | i.charCodeAt(a.charCodeAt(1) - 43) << 12 | i.charCodeAt(a.charCodeAt(2) - 43) << 6 | i.charCodeAt(a.charCodeAt(3) - 43);
        return String.fromCharCode(a >>> 16, a >>> 8 & 255, a & 255)
    }

    function _b64_encode(a) {
        a = unescape(encodeURI(a));
        const b = (a.length + 2) % 3;
        a = (a + "\0\0".slice(b)).replace(/[\s\S]{3}/g, h);
        return a.slice(0, a.length + b - 2) + "==".slice(b)
    }

    function _b64_decode(a) {
        a = a.replace(/[^A-Za-z0-9+\/]/g, "");
        const b = a.length + 3 & 3;
        a = (a + "AAA".slice(b)).replace(/..../g, j);
        a = a.slice(0, a.length + b - 3);
        try {
            return decodeURIComponent(escape(a))
        } catch (a) {
            throw new Error("Not valid UTF-8")
        }
    }
    return {_b64_encode,_b64_decode}
}
const hash_sha56 = pas=> createHash('sha256').update(pas).digest('hex');
const hash_MD5 = pas=> createHash('md5').update(pas).digest('hex');
const encryptPasswordwithKey = (text,key)=> hmessage('sha256',key).update(text).digest('hex');
const textVerse = _=>{
    const deverse = str=>{
        let s = str.toString().split('');
        const len = s.length;
        if((len&1)===0 && len>=2){
            for (let i = 0; i < len-1; i+=2) {
                [s[i],s[i+1]] = [String.fromCharCode(s[i+1].charCodeAt(0)<<2),String.fromCharCode(s[i].charCodeAt(0)<<2)];
            }
        }else{
            for (let i = 0; i < len-2; i+=2) {
                [s[i],s[i+1]] = [String.fromCharCode(s[i+1].charCodeAt(0)<<2),String.fromCharCode(s[i].charCodeAt(0)<<2)];
            }
            const item = String.fromCharCode(s.pop().charCodeAt(0)<<2);
            s.unshift(item)
        }

        return s.join('');
    }
    const inverse = str=>{
        let s = str.toString().split('');
        const len = s.length;
        if((len&1)===0 && len>=2){
            for (let i = 0; i < len-1; i+=2) {
                [s[i],s[i+1]] = [String.fromCharCode(s[i+1].charCodeAt(0)>>2),String.fromCharCode(s[i].charCodeAt(0)>>2)];
            }
        }else{
            for (let i = 1; i < len-1; i+=2) {
                [s[i],s[i+1]] = [String.fromCharCode(s[i+1].charCodeAt(0)>>2),String.fromCharCode(s[i].charCodeAt(0)>>2)];
            }
            const item = String.fromCharCode(s.shift().charCodeAt(0)>>2);
            s.push(item)
        }

        return s.join('');
    }

    return {inverse,deverse}
}


const encodetoVersed = req=> {
    const {_b64_encode} = base_64();
    const verse = textVerse();
    const stringifiedReq = JSON.stringify(req);
    return _b64_encode(verse.deverse(stringifiedReq));
}

const decodeFromVersed = encoded=>{
    const {_b64_decode} = base_64();
    const verse = textVerse();
    return JSON.parse(verse.inverse(_b64_decode(encoded)));
}
module.exports = {base_64,hash_sha56,hash_MD5,encryptPasswordwithKey,textVerse,encodetoVersed,decodeFromVersed}




