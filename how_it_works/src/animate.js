try{
    [].forEach.call(document.querySelectorAll('[data-animation]'), function(observable) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fx = observable.dataset.animation.split(' ');
                    observable.classList.add(...fx);
                    observable.addEventListener('animationend', function handler() {
                        observable.classList.remove(...fx);
                        observable.removeEventListener('animationend', handler);
                    });
                    // /*Comment this line to repeat animation when viewport return to element*/
                    observer.unobserve(observable);
                }
            });
        });
        observer.observe(observable);
    });
}catch (e) {console.error(e);}