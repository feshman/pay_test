import { des, md5 } from './encryption'

function getkeys(o) {
    var arr = new Array();
    var j = 0;
    for (var i in o) {
        arr[j] = i;
        j++;
    }
    return arr.sort();
}

function getvalue(key, jsonObj) {
    for (var item in jsonObj) {
        if (item == key) {
            var jValue = jsonObj[item];
            return jValue;
        }
    }
}
function getencrypvalue(key, jsonObj, secrets) {
    for (var item in jsonObj) {
        if (item == key) {
            var jValue = des.encrypt(jsonObj[item], secrets);
            return jValue;
        }
    }
}
export default function getsign(jsonObj, Array, key, token) {
    var str = null
    if (token == null && Array == null) {
        var keys = getkeys(jsonObj);
        var str = '';
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + getencrypvalue(keys[index], jsonObj, key) + '&';
        }
        str = str + "key=" + key;
    } else if (token == null && Array != null) {
        var keys = getkeys(jsonObj);
        var str = '';
        for (var index = 0; index < keys.length; index++) {
            if (Array.indexOf(keys[index]) == -1) {
                str = str + keys[index] + "=" + getvalue(keys[index], jsonObj) + '&';
            } else {
                str = str + keys[index] + "=" + getencrypvalue(keys[index], jsonObj, key) + '&';
            }
        }
        str = str + "key=" + key;
    }

    else if (token != null) {
        var keys = getkeys(jsonObj);
        var str = '';
        for (var index = 0; index < keys.length; index++) {
            str = str + keys[index] + "=" + getvalue(keys[index], jsonObj) + '&';
        }
        str = str + "key=" + key + "&";
        str = str + "token=" + token;
    }
    
    return md5(str, true)
}

