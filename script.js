document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.album-card');
    const audios = document.querySelectorAll('audio');

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const audio = card.querySelector('audio');

            // Check if the clicked audio is already playing
            const isPlaying = !audio.paused;

            // Pause all audios
            audios.forEach(a => {
                a.pause();
                a.currentTime = 0; // Optional: Reset to start
            });

            // If it wasn't playing before, play it now
            if (!isPlaying) {
                audio.play();
            }
        });
    });
});
