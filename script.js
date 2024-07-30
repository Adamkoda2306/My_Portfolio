document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#options a');
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');
    let isExpanded = false;

    // Restore scroll position on page load
    const restoreScrollPosition = () => {
        const scrollPosition = sessionStorage.getItem('scrollPosition');
        if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            sessionStorage.removeItem('scrollPosition');
        }
    };

    // Save scroll position before unloading
    const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    // Update active link based on scroll position
    function changeActiveLink() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    // Toggle "Read More" and "Read Less" functionality
    readMoreBtn.addEventListener('click', function() {
        if (isExpanded) {
            moreText.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        } else {
            moreText.style.display = 'block';
            readMoreBtn.textContent = 'Read Less';
        }
        isExpanded = !isExpanded;
    });

    // Initialize functionality
    restoreScrollPosition();
    changeActiveLink();

    // Add event listeners
    window.addEventListener('scroll', changeActiveLink);
    window.addEventListener('beforeunload', saveScrollPosition);
});