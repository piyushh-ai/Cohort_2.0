addEventListener("mousemove", (e)=>{
    console.log(e.clientX, e.clientY);
    let body = document.querySelector("body")
    body.style.setProperty('--x', e.clientX + "px")
    body.style.setProperty('--y', e.clientY + "px")
})