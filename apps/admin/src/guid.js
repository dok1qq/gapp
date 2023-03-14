'use strict';

class GUID {
    /**
     * https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid
     */
    static create() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}

module.exports = GUID;
