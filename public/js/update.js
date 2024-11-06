async function updateFormH(event) {
    event.preventDefault();

    const title = document.querySelector('#editpost').value.trim();
    const content = document.querySelector('#contentedit').value.trim();
    const post_id = document.querySelector('#post-id').value;

    if (title && content) {
        const response = await fetch(`/api/blogs/update/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                
                title, 
                content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log('sucess');

            document.location.replace('/dashboard')
        } else {
            alert(response.status.Text)
        }
    }
}
document.querySelector('#editpostform').addEventListener('submit', updateFormH);