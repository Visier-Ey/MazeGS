class Queue {
    constructor() {
        this.data = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }

    enqueue(element) {
        this.data[this.tailIndex] = element;
        this.tailIndex++;
    }

    dequeue() {
        const element = this.data[this.headIndex];
        delete this.data[this.headIndex];
        this.headIndex++;
        return element;
    }

    front() {
        return this.data[this.headIndex];
    }

    isEmpty() {
        return this.headIndex === this.tailIndex;
    }

    length() {
        return this.tailIndex - this.headIndex;
    }

    print() {
        console.log(this.data);
    }

    sort(compare) {
        const arr = Object.values(this.data);
        arr.sort(compare);
        this.data = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            this.enqueue(arr[i]);
        }
    }
}

class Stack {
    constructor() {
        this.data = {};
        this.topIndex = 0;
    }

    push(element) {
        this.data[this.topIndex] = element;
        this.topIndex++;
    }

    pop() {
        if (this.topIndex === 0) return;
        this.topIndex--;
        const element = this.data[this.topIndex];
        delete this.data[this.topIndex];
        return element;
    }

    top() {
        return this.data[this.topIndex - 1];
    }

    isEmpty() {
        return this.topIndex === 0;
    }

    length() {
        return this.topIndex;
    }

    print() {
        console.log(this.data);
    }
}

class Heap{
    constructor(cmp){
        this.data = [];
        this.cmp = cmp;
    }

    insert(element){
        this.data.push(element);
        this.bubbleUp(this.data.length - 1);
    }

    bubbleUp(index){
        while(index > 0){
            let parent = Math.floor((index - 1) / 2);
            if(this.cmp(this.data[index], this.data[parent])) {
                [this.data[index], this.data[parent]] = [this.data[parent], this.data[index]];
                index = parent;
            }
            else break;
        }
    }

    extractMin(){
        if(this.data.length === 0) return;
        let min = this.data[0];
        this.data[0] = this.data[this.data.length - 1];
        this.data.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleDown(index){
        while(true){
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;
            if(left < this.data.length && this.cmp(this.data[left], this.data[smallest])) smallest = left;
            if(right < this.data.length && this.cmp(this.data[right], this.data[smallest])) smallest = right;
            if(smallest !== index){
                [this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]];
                index = smallest;
            }
            else break;
        }
    }

    isEmpty(){
        return this.data.length === 0;
    }

    length(){
        return this.data.length;
    }

    print(){
        // order by level
        let level = 0;
        let levelSize = 1;
        let count = 0;
        for(let i = 0; i < this.data.length; i++){
            if(count === levelSize){
                console.log();
                level++;
                levelSize *= 2;
                count = 0;
            }
            console.log(this.data[i]);
            count++;
        }
    }
}
