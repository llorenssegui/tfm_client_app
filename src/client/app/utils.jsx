export default class Utils {

    constructor() {}

    getIndexElement (list, property, value) {
        for(var i = 0; list.length; i++) {
            var element = list[i];
            console.log(value);
            if(element["" + property] === value["" + property]) {
                return i;
            }
        }
        return -1;
    }

    normalizeString(string) {
        let newString = string;
        if(newString) {
            newString = newString.toLowerCase();
            newString = newString.replace(" ", "");
        }
        return newString;
    }
}