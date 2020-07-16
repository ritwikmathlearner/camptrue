const logging = value => {
    console.log(value);
}

logging(10);
logging(20);

document.querySelector('h1').addEventListener('click', ()=>{
    document.querySelector('h1').innerHTML = "I am changed";
});