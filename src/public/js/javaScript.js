
function showMsg(){
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.textContent="Hello message";
    div.appendChild(p);
    document.getElementById('nav_profile').appendChild(div);
}

const btnHello= document.getElementById('btn_hello');

btnHello.addEventListener('click',showMsg);