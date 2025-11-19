// Select the button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerText = 'Scroll to Top';
scrollTopButton.style.position = 'fixed';
scrollTopButton.style.bottom = '20px';
scrollTopButton.style.right = '20px';
scrollTopButton.style.display = 'none'; // Hidden by default
scrollTopButton.style.zIndex = '1000';
document.body.appendChild(scrollTopButton);

// Show button on scroll
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
};

// Smooth scroll to top
scrollTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};