class Storage {
    constructor() {
        this.Keys = [];
        this.storage = [];
    }

    extract() {
        return this.storage;
    }

    parseFrom(store) {
        this.storage = JSON.parse(store);
        this.storage.forEach(e => {
            this.Keys.push(e.key);
        })
    }

    add_item(key, val) {
        if (!this.Keys.includes(key)) {
            this.storage.push({key: key, value: val})
            this.Keys.push(key);
            return true;
        } else {
            return false;
        }

    }

    len() {
        return this.storage.length;
    }

    get_item(key) {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].key === key) {
                return this.storage[i].value;
            }
        }
        return undefined;
    }

    remove_item(key) {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].key === key) {
                this.storage.splice(i, 1);
                this.Keys.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    update_item(key, val) {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].key === key) {
                this.storage[i].value = val;
                return true;
            }
        }
        return false;
    }

    onFlush() {
        this.Keys = null;
        this.storage = null;
    }
}

export default Storage;