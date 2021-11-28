import Storage from './Storage'
import {decodeFromVersed, encodetoVersed} from '../Crypter'


export const simpleSTORAGE = (name, strict = false) => {
    let isDroppedDB = false;
    const storage_name = name;
    let store = new Storage();
    const storage = localStorage.getItem(storage_name);
    if (strict && storage === null) {
        return null
    }
    storage || localStorage.setItem(storage_name, JSON.stringify([]));
    (storage !== null) && store.parseFrom(storage);

    const _db_info_ = _ => {
        return (isDroppedDB && undefined) || ({DB: storage_name, count: store.len()})
    }

    const addItem = (key, val, encode = true) => {
        if (!isDroppedDB) {
            const isSaved = encode ? store.add_item(key, encodetoVersed(val)) : store.add_item(key, val)
            isSaved && localStorage.setItem(storage_name, JSON.stringify(store.extract()));
            !isSaved && console.error('couldn\'t store data with same key. use function "useItem" to safely handle keys.\n"useItem" may create new key if not exists or update existed')
            return isSaved;
        } else {
            console.error('Not parsable. DB dropped.');
            return false;
        }
    }
    const removeItem = key => {
        if (!isDroppedDB) {
            const isRemoved = store.remove_item(key);
            isRemoved && localStorage.setItem(storage_name, JSON.stringify(store.extract()));
            !isRemoved && console.error('couldn\'t found key. unable To Remove')
            return isRemoved;
        } else {
            console.error('Not parsable. DB dropped.');
            return false;
        }
    }

    const hasKey = require => {
        try {
            return !isDroppedDB ? store.extract().some(e => e.key === require) : false;
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }
    const getItem = (key, decode = true) => {
        if (!isDroppedDB) {
            const val = store.get_item(key)
            return ((val !== undefined && (decode ? decodeFromVersed(val) : val)) || null);
        } else {
            console.error('Not parsable. DB dropped.');
            return false;
        }
    }

    const dropItem = key => {
        if (!isDroppedDB) {
            const isDopped = store.remove_item(key)
            isDopped && localStorage.setItem(storage_name, JSON.stringify(store.extract()));
            return isDopped;
        } else {
            console.error('Not parsable. DB dropped.');
            return false;
        }
    }

    const useItem = (key, val,encode=false) => {
        if (!isDroppedDB) {
            const value = encode?encodetoVersed(val):val;
            const isUpdated = store.update_item(key, value);
            !isUpdated && store.add_item(key, value);
            localStorage.setItem(storage_name, JSON.stringify(store.extract()));
            return isUpdated;
        } else {
            console.error('Not parsable. DB dropped.');
            return false;
        }
    }

    const deleteDB = _ => {
        !isDroppedDB && localStorage.removeItem(storage_name);
        !isDroppedDB && store.onFlush();
        isDroppedDB = true;
    }


    const _init_ = _ => {
        if (!isDroppedDB) {
            return false;
        } else {
            store = new Storage();
            localStorage.setItem(storage_name, JSON.stringify([]));
            isDroppedDB = false;

        }
    }
    return {addItem, getItem, hasKey, dropItem, useItem, deleteDB, _db_info_, _init_, removeItem}


}