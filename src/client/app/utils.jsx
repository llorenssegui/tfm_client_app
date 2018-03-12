export default class Utils {

    constructor() {}

    getIndexElement (list, property, value) {
        for(var i = 0; list.length; i++) {
            var element = list[i];
            if(element["" + property] === value["" + property]) {
                return i;
            }
        }
    }
}