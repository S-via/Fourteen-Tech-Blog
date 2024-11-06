async function newpostFormH(event){
    event.preventDefault();
    console.log('hello')
    const title = document.querySelector('#titlenp').value.trim();
    const content = document.querySelector('#contentnp').value.trim();

    if(title && content){
        const response = await fetch('/api/blogs/newpost',{
            method:'POST',
            body: JSON.stringify({
                title,
                content
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
     if (response.ok){
        console.log('sucessfull');

        document.location.replace('/dashboard')
    } else {
        alert(response.status.Text);
    }

}
}
document.querySelector('#newpostform').addEventListener('submit', newpostFormH);