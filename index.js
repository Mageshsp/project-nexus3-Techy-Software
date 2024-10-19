// animation
const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    });
});


const sectionElements=document.querySelectorAll('.section');
sectionElements.forEach((el)=>observer.observe(el))





//feedback form script
const helpBtn = document.querySelector('.help-btn');
    const feedbackFormContainer = document.getElementById('feedbackFormContainer');
    const closeFeedbackForm = document.getElementById('closeFeedbackForm');

    // Show the feedback form when help button is clicked
    helpBtn.addEventListener('click', () => {
        feedbackFormContainer.style.display = 'block';
    });

    // Close the feedback form when the cross icon is clicked
    closeFeedbackForm.addEventListener('click', () => {
        feedbackFormContainer.style.display = 'none';
    });

    // Optionally close the form when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === feedbackFormContainer) {
            feedbackFormContainer.style.display = 'none';
        }
    });

    document.getElementById('contactForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
    
        const name = document.getElementById('contactname').value;
        const email = document.getElementById('contactemail').value;
        const message = document.getElementById('message').value;
    
        try {
            const response = await fetch('/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
    
            if (response.ok) {
                const successMessage = await response.text(); // or response.json() if you send JSON
                console.log(successMessage); // You can display this message on the UI
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    });

    //feedback backend
    document.getElementById('feedbackForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
    
        const name = document.getElementById('feedbackname').value;
        const email = document.getElementById('feedbackemail').value;
        const message = document.getElementById('feedbackMessage').value;
    
        try {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
    
            if (response.ok) {
                const successMessage = await response.text();
                console.log(successMessage); // Display this message on the UI
                alert(successMessage); // Show alert or update UI to notify the user
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
                alert("Error occurred while submitting feedback");
            }
        } catch (error) {
            console.error('Error submitting the feedback:', error);
            alert("Error occurred while submitting feedback");
        }
    });
