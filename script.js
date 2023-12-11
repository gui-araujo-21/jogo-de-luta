const qS = (el) => document.querySelector(el);
const qSA = (el) => document.querySelectorAll(el);

const elHero = document.querySelector('#hero');
const elAntiHero = document.querySelector('#anti-hero');


let heroFighter = '';
let antiHeroFighter = '';


const select = (item)=>{
    let idOfDiv = item.target.parentNode.parentNode.parentNode.getAttribute('id');
    let verifySelected = document.querySelector(`#${idOfDiv} .char.selected`);
    if(idOfDiv == 'hero'){
        if(verifySelected){
            document.querySelector('#hero .char.selected').classList.remove('selected');
        }
        qS(`#hero div[data-hero="${item.target.getAttribute('data-hero')}"]`).classList.add('selected');
        qS('#hero img').src = `images/${item.target.getAttribute('data-hero')}.jpg`
        qS('#hero img').style.display = 'flex';
        heroFighter = heros[item.target.getAttribute('data-hero')-1];
    }else{
        if(verifySelected){
            document.querySelector('#anti-hero .char.selected').classList.remove('selected');
        }
        qS(`#anti-hero div[data-hero="${item.target.getAttribute('data-hero')}"]`).classList.add('selected');
        qS('#anti-hero img').src = `images/a${item.target.getAttribute('data-hero')}.jpg`
        qS('#anti-hero img').style.display = 'flex';
        antiHeroFighter =  antiHeros[item.target.getAttribute('data-hero')-1];
    }
    
}



const start = (elFighter1, elFighter2, fighter1, fighter2)=>{

    const doAttack = (attacking,attacked)=>{

        let randomAttack = attacking.attack*Math.random();
        let randomDefense = attacked.defense*Math.random()*2.2;

        
        if(randomDefense > attacking.attack){
            renderLog(`${attacked.nameHero} se esquivou`);
        }else{
            attacked.life -= randomAttack;
            renderLog(`${attacking.nameHero} causou: ${randomAttack.toFixed(2)} pontos de dano`);
        }
        if(attacked.life <= 0){
            attacked.life = 0;
            qSA('.hero-attack').forEach(item => item.style.display='none');
            renderLog(`Fim de Jogo! ${attacking.nameHero} venceu a Luta!`)
        }
        renderStats();
    
    }

    const renderLog = (msg)=>{
        qS('.log-area').innerHTML += `<li>${msg}</li>`
    }

    const renderStats = ()=>{
        //fighter1
        elFighter1.querySelector('.hero-fighting-image img').src = `images/${fighter1.id}.jpg`
        elFighter1.querySelector('.name-hero').innerHTML = fighter1.nameHero;
        elFighter1.querySelector('.life').style.width = `${fighter1.life*100/fighter1.maxLife}%`
        elFighter1.querySelector('.hero-HP').innerHTML = `${fighter1.life.toFixed(2)} - HP`

        //fighter2
        elFighter2.querySelector('.hero-fighting-image img').src = `images/a${fighter2.id}.jpg`
        elFighter2.querySelector('.name-hero').innerHTML = fighter2.nameHero;
        elFighter2.querySelector('.life').style.width = `${fighter2.life*100/fighter2.maxLife}%`
        elFighter2.querySelector('.hero-HP').innerHTML = `${fighter2.life.toFixed(2)} - HP`
    }
    
    renderStats();
   

    //display
    qSA('.hero-selecting').forEach( item => item.style.display = 'none');
    qS('.button-start').style.display = 'none';
    qS('.log-area').style.display = 'block';
    qSA('.hero-fighting').forEach(item => item.style.display = 'flex');


    elFighter1.querySelector('.hero-attack').addEventListener('click',()=>{
        doAttack(fighter1,fighter2);
    })

    elFighter2.querySelector('.hero-attack').addEventListener('click',()=>{
        doAttack(fighter2,fighter1);
    })
    
}

qSA('.char').forEach((item)=>{
    item.addEventListener('click',select);
})

qS('.button-start').addEventListener('click',()=>{
    start(elHero,elAntiHero,heroFighter,antiHeroFighter)
})