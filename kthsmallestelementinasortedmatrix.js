//Objective is to find the kth smallest element in a sorted (from left to right
//and top to bottom) matrix

let matrix = [
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
], k = 8


//O(klogn) solution where n is the number of elements in the matrix,
//and k is the number of times we remove

class MaxHeap {
    constructor() {
        // so child can be at 2*parentPosition and 2*parentPosition + 1, 
        this.list = [0]
        this.size = 0
    }
    
    insert(value) {
        this.list.push(value)
        this.size++
        this.moveUp(this.size)
    }
    
    
    moveUp(position) {
        //While we're not at the pseudo root of '0'
        while (Math.floor(position / 2) > 0) {
            let parent = Math.floor(position / 2)
        
            //If the child is greater than the parent, swap them
            if (this.list[parent] < this.list[position]) {
                let temp = this.list[parent]
                this.list[parent] = this.list[position];
                this.list[position] = temp
            }
            
            //then change the position of the child
            position = parent
        }
    }
    
    remove() {
        let maxValue = this.list[1]

        //Move the element to the back of the list and pop it out
        this.list[1] = this.list[this.size]
        this.size--
        this.list.pop()
        
        this.moveDown(1)
        
        return maxValue
    }
    
    moveDown(position) {
        while ((position * 2) <= this.size) {
            const maxChildPosition = this.findMaxChild(position)

            if (this.list[maxChildPosition] > this.list[position]) {
                let temp = this.list[position]
                this.list[position] = this.list[maxChildPosition]
                this.list[maxChildPosition] = temp
            }
            
            position = maxChildPosition
        }
    }
    
    findMaxChild(position) {
        let rightChild = (position * 2) + 1
        let leftChild = (position * 2)
        
        //If the right child doesn't exist...
        if (rightChild > this.size) {
            return leftChild
        } else {
            if (this.list[rightChild] > this.list[leftChild]) {
                return rightChild
            } else {
                return leftChild
            }
        }
    }
    
    build(arrayList) {
        let len = arrayList.length
        this.size = len
        this.list = [0, ...arrayList]
        
        let position = Math.floor(len / 2)
        
        while (position > 0) {
            this.moveDown(position)
            position--
        }
    }
}

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