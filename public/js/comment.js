async function commentFormH(event) {
    event.preventDefault();

    const comments = document.querySelector('#commentpost').value.trim();
    const blog_id = document.querySelector('#blog-id').value.trim();
    if (comments) {
        const response = await fetch('/api/comments/',{
            method: 'POST',
            body: JSON.stringify({
                blog_id,
                comments
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log('sucess');

            document.location.replace('/')
        } else {
            alert(response.status.Text)
        }
    }
}

document.querySelector('#commentform').addEventListener('submit', commentFormH);