//Objective is to find the kth smallest element in a sorted (from left to right
//and top to bottom) matrix

let matrix = [
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
], k = 8


//O()

let removeTimes = matrix.length * matrix[0].length - k + 1
let arr = []

let heap = new MaxHeap()
let result = 0

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
        heap.insert(matrix[i][j])
    }
}

while (removeTimes) {
    result = heap.remove()
    removeTimes--
}

return result