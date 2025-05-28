// Find the Maximum number in an array
// Sort the array in ascending order (1 to 15)

let arr = [4, 5, 1, 2, 8, 3, 6, 10, 12, 9, 14, 7, 15, 11, 13];

function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}


console.log(findMax(arr));


let sortArray = (arr) => {
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}