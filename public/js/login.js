// event handler to ger login information
async function loginFormH(event) {
    event.preventDefault();
}

// to get from login.hdb  passed inside ()
const username = document.querySelector('usernameli').value.trim();
const password = document.querySelector('passwordli').value.trim();

// when form has values send POST request
if (username && password) {
    const response = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        header: {
            'Content-type': 'application/json'
        }
    });
    if(response.ok){
        console.log('sucessfull');
        // redirect to dashboard?? 
        document.location.replace('/dashboard')
    } else {
        // alert response
        alert(response.status.Text);
    }
}
document.querySelector('#loginform')
.addEventListener('submit',loginFormH);