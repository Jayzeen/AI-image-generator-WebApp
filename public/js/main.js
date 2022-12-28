let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add a prompt to get started');
        return;
    }

    generateImageRequest(prompt, size);
    document.getElementById("image-box").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

// Image generation function
async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        // Check if error occurs for generation
        if(!response.ok) {
            removeSpinner();
            throw new Error('The image could not be generated. Please try again or a different prompt');
        }

        const data = await response.json();
       
        // Show generated image
        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;

        removeSpinner();

    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}



// Show spinner when loading
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
    document.getElementById("section").classList.add('blur');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
    document.getElementById("section").classList.remove('blur');
}


document.querySelector('#image-form').addEventListener('submit', onSubmit);