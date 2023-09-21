const openPopUp =document.getElementById('open');
const popUpForm =document.getElementById('form');
const popUpClose =document.getElementById('close');

openPopUp.addEventListener('click',function (e){
    e.preventDefault();
    popUpForm.classList.add('active');
})
popUpClose.addEventListener('click',(e)=>{
    popUpForm.classList.remove('active');
})
const loginForm =document.querySelector('.log-in-form');
const loginUrl="https://ajax.test-danit.com/api/v2/cards/login";
const TOKEN ='token';
loginForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    const body={};
    e.target.querySelectorAll('input').forEach(input=> {
        body[input.name]= input.value
    })
    axios.post(loginUrl,body)
        .then(({data})=> {
            localStorage.setItem(TOKEN,data)
        })
})
const newWindow =document.querySelector('.name_of_visit')
function authorization(){
    popUpForm.classList.remove('active');
    newWindow.style.display='block';
}
const enterNextWindow =document.getElementById('enter')
if(localStorage.getItem(TOKEN)){
    enterNextWindow.addEventListener('click',(e)=>{
        authorization()
    })
};