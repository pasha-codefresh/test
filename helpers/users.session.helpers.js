/**
 *
 * Transform object to array of objects by first level keys and sort array
 *
 * @param obj
 * @param nestedProp - name of property if obj have nested objects
 * @returns {Array} sorted array of objects
 */
function objectToSortedArray(obj, nestedProp) {
    let arr = [];

    Object.keys(obj).forEach(function (key) {
        if (nestedProp) {
            arr.push({name: key, value: obj[key][nestedProp]});
        } else {
            arr.push({name: key, value: obj[key]});
        }
    });

    return sortArray({arr});
}

/**
 * sort array
 * @param object with properties arr, type - sort type (desc default)
 * @returns sorted array
 */
function sortArray({arr, type}) {
    return arr.sort(function (a, b) {
        if (type === 'asc') {
            return a.value - b.value;
        } else {
            return b.value - a.value;
        }
    });
}

/**
 * Takes the first line that contains the field names,
 * then parses all the following lines and creates an object where the describing string
 *
 * @param fileRows - array of strings, each string is a line of a file
 */

function createFileRowsStructure(fileRows) {
    let resultFileStructure = [];
    let structureArr = fileRows.shift().split('|');

    fileRows.forEach(function (row) {

        if (row) {
            let splitedRow = row.split('|');
            let lineObj = {};

            structureArr.forEach(function (name, index) {
                lineObj[name] = splitedRow[index];
            });

            resultFileStructure.push(lineObj);
        }
    });

    return resultFileStructure;
}

module.exports.objectToSortedArray = objectToSortedArray;
module.exports.sortArray = sortArray;
module.exports.createFileRowsStructure = createFileRowsStructure;