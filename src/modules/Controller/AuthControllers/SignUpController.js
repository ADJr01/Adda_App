'use strict'
const User = require('../../../Models/User');
const Credential = require('../../../Models/Credentials')
const {Generator} = require('../../Utility/Generator')
const default_path = "E:\\Projects\\FULL_STACK\\ADDA\\adda_app\\src\\modules\\Controller\\AuthControllers\\Assets\\"
const fs = require("fs");

const parseImage = (path) => {
    // * let extensionName = path.extname(`${process.cwd()}/pics/demopic.png`);   G E T    F I L E    E X T E N S I O N
    // let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (error, data) {
            if (error) return reject(error);
            resolve(Buffer.from(data, 'binary').toString('base64'));
        });
    });
}


const onSignUp = async params => {
    const path = params.gender && (params.gender.toString().toLowerCase() === 'male') ? `${default_path}Male.png` : `${default_path}Female.png`;
    let bufferImage = await parseImage(path)
    if (bufferImage) {
        try {
            await User.create({
                fname: params.first_name,
                lname: params.last_name,
                email: params.email,
                display: {
                    img: bufferImage,
                    format: 'png'
                },
                dob: params.dob,
                gender: params.gender
            });
            const token = new Generator().generateOfLen(90);
            await Credential.create({
                user: params.email,
                acpc: token,
                password: params.password
            });
            return {isSaved: true, responseCode: 201,fname: params.first_name,lname: params.last_name,email:params.email,display: {img: bufferImage, format: 'png'}, userToken: token}
        } catch (e) {
            console.log('User trying to access with same email');
            const userExist = e.message.toString().includes('dup key');
            return {isSaved: false, responseCode: ((userExist && 400) || 500), userToken: null}
        }
    } else {
        console.log(path)
        return {isSaved: false, responseCode: 501, userToken: null}
    }

}

module.exports = onSignUp;