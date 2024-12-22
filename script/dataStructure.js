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
