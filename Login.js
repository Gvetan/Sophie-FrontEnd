const loginconnect = ("http://localhost:5678/api/users/login");

console.log(document.getElementById('login-form'));

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
console.log(user)
    try{
      let response = await fetch (loginconnect, {
        method: 'POST',
       body: user
})
    }
    catch(error)
    {
      console.error(error)
    }
    
    
})