const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);


const select = (item)=>{
    let idOfDiv = item.target.parentNode.parentNode.getAttribute('id');
    let verifySelected = document.querySelector(`#${idOfDiv} .char.selected`);
    if(idOfDiv == 'hero'){
        if(verifySelected){
            document.querySelector('#hero .char.selected').classList.remove('selected');
        }
        qS(`#hero div[data-hero="${item.target.getAttribute('data-hero')}"]`).classList.add('selected');
        qS('#hero img').src = `images/${item.target.getAttribute('data-hero')}.jpg`
        qS('#hero img').style.display = 'flex';
    }else{
        if(verifySelected){
            document.querySelector('#anti-hero .char.selected').classList.remove('selected');
        }
        qS(`#anti-hero div[data-hero="${item.target.getAttribute('data-hero')}"]`).classList.add('selected');
        qS('#anti-hero img').src = `images/a${item.target.getAttribute('data-hero')}.jpg`
        qS('#anti-hero img').style.display = 'flex';
    }
    
}


qSA('.char').forEach((item)=>{
    item.addEventListener('click',select);
})

