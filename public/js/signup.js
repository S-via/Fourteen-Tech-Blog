// add event handler to get user signup information
async function signupFormH(event){
    event.preventDefault();
}
// from signup.hdb get get label passes inside ()
const username = document.querySelector('#usernamesu').value.trim();
const password = document.querySelector('#passwordsu').value.trim();

// when form has values send a POST request 
if (username && password) {
    const response = await fetch('/users/signup', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: {
            'Content-type': 'application/json'
        }

    });
    if (response.ok) {
        console.log('sucessfull');
/// redirect to homepage
        document.location.replace('/homepage')
    } else {
        alert(response.status.Text);
    }
}
document.querySelector('#signupform')
.addEventListener('submit',signupFormH);