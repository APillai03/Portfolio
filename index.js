var colors = ["red", "blue", "green"];
var i =0;
function setcolor(){
    i = i%(colors.length);
    $('#name').removeClass(colors.join(' ')).addClass(colors[i]);
    i++
}
console.log(i);
setInterval(setcolor, 2000);