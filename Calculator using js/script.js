const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const specialChar = ['%', '*', '/', '-', '+', '='];
let output = '';

const calculate = function (e) {
  const btnValue = e.target.dataset.value;

  if(btnValue === '=' && output !== '')
  {
    output = eval(output.replace('%', '/100'));
  }
  else if(btnValue === 'AC')
  {
    output = '';
  }
  else if(btnValue === 'DEL')
  {
    output = output.toString().slice(0, -1);
  }
  else{
    if(output === '' && specialChar.includes(btnValue)) return;
    output += btnValue; 
  } 
  display.value = output;
};

buttons.forEach(btn => {
  btn.addEventListener('click', calculate);
});
