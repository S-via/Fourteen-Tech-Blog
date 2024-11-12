async function deleteFormH(event) {
    event.preventDefault();

    const postId = document.querySelector('#post-id').value;
    if (!postId) {
        return;
    }

    const response = await fetch(`/api/blogs/delete/${postId}`, {
        method: 'DELETE',
        headers:
        {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        console.log('sucess');

        document.location.replace('/dashboard')

    } else {
        alert(response.statusText)
    }

}
document.querySelector('#deletebutton').addEventListener('click',deleteFormH)