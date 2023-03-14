'use strict';

const leadZeroesRegexp = /[0].+\d+/;
const lettersRegexp = /.*[a-zA-Z]+.*/;

class IP {
    static validateIPv4(value) {
        const isString = typeof value === 'string';
        if (!isString) {
            return {
                valid: false,
                message: `IP format is not valid. IP should be string. Current type is ${isString}`
            };
        }

        const parts = value.split('.');

        if (parts.length !== 4) {
            return {
                valid: false,
                message: `IP format is not valid. Format should be: "x1.x2.x3.x4" where 0 <= xi <= 255. Current value ${value}`,
            }
        }

        for (let i = 0; i < parts.length; i++) {
            const curr = parts[i];

            const leadingZeroes = leadZeroesRegexp.test(curr);
            if (leadingZeroes) {
                return {
                    valid: false,
                    message: `IP format is not valid. IP ${value} contain leading zeroes`,
                };
            }

            const containSymbols = lettersRegexp.test(curr);
            if (containSymbols) {
                return {
                    valid: false,
                    message: `IP format is not valid. IP ${value} contain symbols`,
                };
            }

            const num = Number(curr);
            if (num < 0 || num > 255) {
                return {
                    valid: false,
                    message: `IP format is not valid. Format should be: "x1.x2.x3.x4" where 0 <= xi <= 255. Current value ${value}`,
                };
            }
        }

        return {
            valid: true,
            message: '',
        };
    }
}

module.exports = IP;
