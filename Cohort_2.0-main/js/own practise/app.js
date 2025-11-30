let arr = [3, -5, 10, -2, 7];
let counter = 0
for(let i = 0; i < arr.length; i++){
if(arr[i]<0){
    counter++
}
}
console.log(`Total negative numbers: ${counter}`);