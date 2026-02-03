document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.album-card');
    const audios = document.querySelectorAll('audio');

    cards.forEach((card, index) => {
        const img = card.querySelector('.album-art');

        // Extract dominant color from image
        const getDominantColor = (imageElement) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to a small value for performance
            canvas.width = 100;
            canvas.height = 100;

            ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

            try {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0, g = 0, b = 0;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                const pixelCount = data.length / 4;
                r = Math.floor(r / pixelCount);
                g = Math.floor(g / pixelCount);
                b = Math.floor(b / pixelCount);

                return `rgb(${r}, ${g}, ${b})`;
            } catch (e) {
                console.warn('Cannot extract color from image due to CORS or other error', e);
                return null;
            }
        };

        const applyColor = () => {
            const color = getDominantColor(img);
            if (color) {
                card.dataset.dominantColor = color;
            }
        };

        if (img.complete) {
            applyColor();
        } else {
            img.addEventListener('load', applyColor);
        }

        // Hover effect for background color
        card.addEventListener('mouseenter', () => {
            if (card.dataset.dominantColor) {
                const cardInfo = card.querySelector('.card-info');
                if (cardInfo) {
                    cardInfo.style.backgroundColor = card.dataset.dominantColor;
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            const cardInfo = card.querySelector('.card-info');
            if (cardInfo) {
                cardInfo.style.backgroundColor = ''; // Revert to CSS default
            }
        });

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
