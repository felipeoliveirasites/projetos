document.addEventListener("DOMContentLoaded", () => {
    const verseContainers = document.querySelectorAll('.verse-container');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function toggleHoverClass() {
        verseContainers.forEach(container => {
            if (isElementInViewport(container)) {
                container.classList.add('hover');
            } else {
                container.classList.remove('hover');
            }
        });
    }

    // Call the function once to check the initial state
    toggleHoverClass();

    // Add scroll event listener
    window.addEventListener('scroll', toggleHoverClass);
});