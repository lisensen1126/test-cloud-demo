export function formatJson(json) {
    let i = 0,
        il = 0,
        tab = '    ',
        newJson = '',
        indentLevel = 0,
        inString = false,
        currentChar = null;
    let flag = false;
    for (i = 0, il = json.length; i < il; i += 1) {
        currentChar = json.charAt(i);
        switch (currentChar) {
            case '{':
                if (i != 0 && json.charAt(i - 1) === '$') {
                    newJson += currentChar;
                    flag = true;
                } else if (!inString) {
                    newJson += currentChar + '\n' + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    newJson += currentChar;
                }
                break;
            case '[':
                if (!inString) {
                    newJson += currentChar + '\n' + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    newJson += currentChar;
                }
                break;
            case '}':
                if (flag) {
                    newJson += currentChar;
                    flag = false;
                } else if (!inString) {
                    indentLevel -= 1;
                    newJson += '\n' + repeat(tab, indentLevel) + currentChar;
                } else {
                    newJson += currentChar;
                }
                break;
            case ']':
                if (!inString) {
                    indentLevel -= 1;
                    newJson += '\n' + repeat(tab, indentLevel) + currentChar;
                } else {
                    newJson += currentChar;
                }
                break;
            case ',':
                if (!inString) {
                    newJson += ',\n' + repeat(tab, indentLevel);
                } else {
                    newJson += currentChar;
                }
                break;
            case ':':
                if (!inString) {
                    newJson += ': ';
                } else {
                    newJson += currentChar;
                }
                break;
            case ' ':
            case '\n':
            case '\t':
                if (inString) {
                    newJson += currentChar;
                }
                break;
            case '"':
                if (i > 0 && json.charAt(i - 1) !== '\\') {
                    inString = !inString;
                }
                newJson += currentChar;
                break;
            default:
                newJson += currentChar;
                break;
        }
    }
    return newJson;
}

function repeat(s, count) {
    return new Array(count + 1).join(s);
}

export function formatXml(text) {
    //?????????????????????
    text =
        '\n' +
        text
            .replace(/(<\w+)(\s.*?>)/g, function($0, name, props) {
                return name + ' ' + props.replace(/\s+(\w+=)/g, ' $1');
            })
            .replace(/>\s*?</g, '>\n<');
    //???????????????
    text = text
        .replace(/\n/g, '\r')
        .replace(/<!--(.+?)-->/g, function($0, text) {
            var ret = '<!--' + escape(text) + '-->';
            //alert(ret);
            return ret;
        })
        .replace(/\r/g, '\n');
    //????????????
    // eslint-disable-next-line no-useless-escape
    var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/gm;
    var nodeStack = [];
    var output = text.replace(rgx, function(
        $0,
        all,
        name,
        isBegin,
        isCloseFull1,
        isCloseFull2,
        isFull1,
        isFull2
    ) {
        var isClosed =
            isCloseFull1 == '/' || isCloseFull2 == '/' || isFull1 == '/' || isFull2 == '/';
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin == '!') {
            prefix = getPrefix(nodeStack.length);
        } else {
            if (isBegin != '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            } else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }
        }
        var ret = '\n' + prefix + all;
        return ret;
    });
    // eslint-disable-next-line no-unused-vars
    var prefixSpace = -1;
    var outputText = output.substring(1);
    //alert(outputText);
    //????????????????????????????????????
    outputText = outputText
        .replace(/\n/g, '\r')
        .replace(/(\s*)<!--(.+?)-->/g, function($0, prefix, text) {
            //alert(['[',prefix,']=',prefix.length].join(''));
            if (prefix.charAt(0) == '\r') prefix = prefix.substring(1);
            text = unescape(text).replace(/\r/g, '\n');
            var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/gm, prefix) + '-->';
            //alert(ret);
            return ret;
        });
    return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}

/**
 * @param time ??????
 * @param cFormat ??????
 * @returns {string|null} ?????????
 * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
 */
export function formatTime(time, cFormat) {
    if (arguments.length === 0) return null;
    if ((time + '').length === 10) {
        time = +time * 1000;
    }
    let format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}',
        date;
    if (typeof time === 'object') {
        date = time;
    } else {
        date = new Date(time);
    }
    let formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    return format.replace(/{([ymdhisa])+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['???', '???', '???', '???', '???', '???', '???'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
}

function getPrefix(prefixIndex) {
    var span = ' ';
    var output = [];
    for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }
    return output.join('');
}
