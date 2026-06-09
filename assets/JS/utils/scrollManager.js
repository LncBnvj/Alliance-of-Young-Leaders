export function initScrollManager(
    callbacks
) {
    let ticking = false;
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    callbacks.forEach(
                        fn => fn()
                    );
                    ticking = false;
                });
                ticking = true;
            }
        },
        { passive: true }
    );
}