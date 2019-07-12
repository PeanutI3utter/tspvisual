let canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
document.getElementById('points').addEventListener('click', generatePoints)
document.getElementById('route').addEventListener('click', drawRoute)






//LinkedList implementation 

function isJsonable(v) {
    try{
        return JSON.stringify(v) === JSON.stringify(JSON.parse(JSON.stringify(v)));
     } catch(e){
        /*console.error("not a dict",e);*/
        return false;
    }
}

function isDict(v) {
    return !!v && typeof v==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date) && isJsonable(v);
}

function dictToString(dict){
    let res = '{'

    let keys = Object.keys(dict)
    if(keys.length > 0){
        res += keys[0]
        res += ': '
        res += dict[keys[0]]
        for(let i = 1; i < keys.length; i++){
            res += ' , '
            res += keys[i]
            res += ': '
            res += dict[keys[i]]
        }
    }

    res += '}'
    return res
}

class Node{
    constructor(data, next = null){
        this.data = data,
        this.next = next
    }
}

class LinkedList{
    constructor(){
        this.head = null
        this.size = 0
        this.tail = null
    }
}

LinkedList.prototype.insert = function(data) {
    let newNode = new Node(data)

    if(!this.tail){
        this.head = newNode
        this.tail = newNode
        this.size++
        return true
    }else{
        this.tail.next = newNode 
        this.tail = newNode
        this.size++
        return true
    }
    
};


LinkedList.prototype.insertAtBeginning = function(data) {
    // body...
    let newNode = new Node(data)

    newNode.next = this.head
    this.head = newNode
    this.size++
    return true
};


LinkedList.prototype.insertAt = function (index, data) {
    let newNode = new Node(data)

    if(index >= this.size){
        return false
    }
    let prevNode = this.head
    let currentNode = this.head
    while(index > 0){
        prevNode = currentNode
        currentNode = currentNode.next
        index--
    }
    if(prevNode == this.head){
        newNode.next = this.head
        this.head = newNode
    }else{
        prevNode.next = newNode
        newNode.next = currentNode
    }
    if(this.tail.next != null){
        this.tail = this.tail.next
    }
    this.size++
    return true
}


LinkedList.prototype.get = function(index) {
    if(index >= this.size){
        return false
    }
    let res = this.head
    while(index > 0){
        res = res.next
        index--
    }
    return res.data
};


LinkedList.prototype.getInt = function(index) {
    if(index >= this.size){
        return false
    }
    let res = this.head
    while(index > 0){
        res = res.next
        index--
    }
    return res
};

LinkedList.prototype.delete = function(index) {
    if(index >= this.size){
        return false
    }
    let prev = null
    let del = this.head
    while(index > 0){
        prev = del
        del = del.next
        index--
    }
    if(prev == null){
        this.head = del.next
        if(del == this.tail){
            this.tail = this.head
        }
    }else{
        prev.next = del.next
        if(del == this.tail){
            this.tail = prev
        }
    }
    this.size--
    return del.data
};

LinkedList.prototype.deleteAll = function(obj){
    let i = 1
    let preCurr = this.head
    let curr = this.head.next
    while(i < this.size - 2){
        if(curr.data == obj){
            preCurr.next = curr.next
            this.size--
        }else{
            preCurr = curr
        }
        curr = curr.next
        i++
    }
    if(this.tail == obj){
        this.tail = this.preTail
        this.preTail = curr
        this.size--
    }
    if(this.tail == obj){
        this.tail = this.preTail
        this.preTail = preCurr
        this.size--
    }
    if(this.head.data == obj){
        this.head = this.head.next
        this.size--
    }
    return true
}


LinkedList.prototype.del = function(obj){
    let i = 1
    let preCurr = this.head
    let curr = this.head.next
    while(i < this.size - 2){
        if(curr.data == obj){
            preCurr.next = curr.next
            break;
        }
        preCurr = curr
        curr = curr.next
        i++
    }
    if(this.tail == obj){
        this.tail = this.preTail
        this.preTail = curr
    }
    if(this.tail == obj){
        this.tail = this.preTail
        this.preTail = preCurr
    }
    if(this.head.data == obj){
        this.head = this.head.next
    }
    return true
}

LinkedList.prototype.pop = function() {
    return this.delete(0)
};

LinkedList.prototype.slice = function(index) {
    if(index >= this.size || index < 0){
        return false
    }else{
        let ll = new LinkedList()
        let curr = this.head
        let i = 0
        while(index > 0){
            curr = curr.next
            index--
            i++
        }

        while(i < this.size){
            ll.insert(curr.data)
            curr = curr.next
            i++
        }
        return ll
    }
};

LinkedList.prototype.slice = function(start, end) {
    if(start >= this.size || start < 0 || end >= this.size || end < 0 || end < start){
        return false
    }else{
        let ll = new LinkedList()
        let curr = this.head
        let i = 0
        while(start > 0){
            curr = curr.next
            start--
            i++
        }

        while(i < end){
            ll.insert(curr.data)
            curr = curr.next
            i++
        }
        return ll
    }
};

LinkedList.prototype.pollLast = function() {
    return this.delete(this.size - 1)
};


LinkedList.prototype.getLast = function() {
    return this.tail.data
};

LinkedList.prototype.getPreLast = function() {
    return this.get(this.size - 2)
};

LinkedList.prototype.copy = function() {
    let ll = new LinkedList()
    let curr = this.head
    while(curr != null){
        ll.insert(curr.data)
        curr = curr.next
    }
    return ll
};

LinkedList.prototype.toString = function(){
    let string = "["

    if(this.head != null){
        if(isDict(this.head.data)){
            string += dictToString(this.head.data)
        }else{
            string += this.head.data
        }
        
        let curr = this.head.next
        while(curr != null){
        string += ', '
        if(isDict(curr.data)){
            string += dictToString(curr.data)
        }else{
            string += curr.data
        }
        curr = curr.next
        }
    }
    
    string += ']'
    return string
}

//debug

let l = new LinkedList()
for(let i = 0; i < 10; i++){
    l.insert(i)
}

console.log(l)

for(let i = 0; i < 10; i++){
    l.insert(i+20)
}


// main code

let dist = 0
let points = new LinkedList()
let distanceMap = {}
let solution = new LinkedList

function generatePoints() {
    points = new LinkedList()
    for (let i = 0; i < 10; i++) {
        points.insert({ xPos: Math.random() * (canvas.width - 5) + 5, yPos: Math.random() * (canvas.height - 5) + 5 })
    }
    drawPoints()
}

function drawPoints () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < points.size; i++) {
        let point = points.get(i)
        context.beginPath()
        context.fillStyle = 'yellow'
        context.strokeStyle = 'yellow'
        context.arc(point.xPos, point.yPos, 1, 0, Math.PI * 2)
        context.fill()
    }
}


// TSP solve implementation#####################################################

function distance(pointA, pointB){
    return Math.sqrt(Math.pow(pointA.xPos - pointB.xPos, 2) + Math.pow(pointA.yPos - pointB.yPos, 2))
}

function solve(){
    let available = points.copy()  
    //console.log(points.toString())
    //console.log(available.toString())  
    //console.log(distanceMap)
    let start = available.pop();
    let sol = new LinkedList()
    sol.insert(start)
    /*
    console.log("distMap:")
    for(var i = 0; i < points.size; i++){
        for(var j = 0; j < points.size; j++){
            console.log(distanceMap[points.get(i)][points.get(j)])
        }
    }
    */
    dist = Number.MAX_VALUE
    backtrackRec(sol, available, 0)
}

function backtrackRec(sol, av, currDist){
    //console.log(av.toString())
    if(av.size > 0){
        for(let i = 0; i < av.size; i++){
            let city = av.delete(0)
            //console.log(city)
            //console.log(sol.getLast())
            let distanc = currDist + distance(city, sol.getLast())
            console.log(distanc)
            sol.insert(city)
            if(!prune(sol, distanc)){
                backtrackRec(sol, av, distanc, i)
            }
            
            sol.pollLast()
            av.insert(city)
        }
    }else{
        currDist += distance(sol.get(0), sol.getLast())
        console.log("currDist:")
        console.log(currDist)
        console.log("dist :")
        console.log(dist)
        if(currDist < dist){
            let newBest = sol.copy()
            newBest.insert(sol.get(0))
            console.log("sol :")
            console.log(newBest.toString())
            dist = currDist
            solution = newBest
        }
    }
}

function prune(s, d){
    //console.log(s.toString())
    //console.log(s.get(0).xPos)
    //console.log(s.get(0).yPos)
    if(d  > dist){
        return true
    }else if(s.size > 2){
        let lastAdded = s.getLast()   
        let beforeLast = s.getPreLast()

        let x1 = beforeLast.xPos;
        let y1 = beforeLast.yPos;
        let x2 = lastAdded.xPos;
        let y2 = lastAdded.yPos;
        
        // loop through all other edges and check for intersections with last edge
        for (let i = 0; i < s.size - 2; i++) {
            let x3 = s.get(i).xPos
            let y3 = s.get(i).yPos
            let x4 = s.get(i + 1).xPos
            let y4 = s.get(i + 1).yPos
            
            let t1 = ((y3 - y4)*(x1 - x3) + (x4 - x3)*(y1 - y3))/((x4 - x3)*(y1 - y2) - (x1 - x2)*(y4 - y3));
            let t2 = ((y1 - y2)*(x1 - x3) + (x2 - x1)*(y1 - y3))/((x4 - x3)*(y1 - y2) - (x1 - x2)*(y4 - y3));
            
            if (t1 > 0 && t1 < 1 && t2 > 0 && t2 < 1) return true;
        }
    }
    return false
}

//##############################################################################

function drawRoute() {
    /*
    buildDistanceMap()
    solution = []
    available = points.slice(0)
    console.log(available)
    solution.push(available.pop())
    console.log(solution)
    */
    solution = new LinkedList()
    distanceMap = {}
    buildDistanceMap()
    solve()
    drawEdges(solution)
    //drawEdges(points)
    //drawEdges(points)
}

function buildDistanceMap() {

    for(let i = 0; i < points.size; i++) {
        pointA = points.get(i);
        distanceMap[pointA] = {}
        for (let j = 0; j < points.size; j++) {
            pointB = points.get(j);
            distanceMap[pointB] = {}
            distanceMap[pointA][pointB] = Math.sqrt(Math.pow(pointA.xPos - pointB.xPos, 2) 
                                + Math.pow(pointA.yPos - pointB.yPos, 2))
            distanceMap[pointB][pointA] = distanceMap[pointA][pointB]
        }
    }
}

function drawEdges(points) {
    for (let i = 0; i < points.size - 1; i++) {
        context.beginPath()
        context.lineWidth = 0.3;
        context.strokeStyle = 'yellow'
        context.moveTo(points.get(i).xPos, points.get(i).yPos)
        context.lineTo(points.get(i + 1).xPos, points.get(i + 1).yPos)
        context.stroke()
    }
}

