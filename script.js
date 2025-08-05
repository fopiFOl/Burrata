// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Main video unmute functionality
    const mainVideo = document.getElementById('mainVideo');
    const unmuteButton = document.getElementById('unmuteButton');

    if (mainVideo && unmuteButton) {
        // Handle unmute button click
        unmuteButton.addEventListener('click', function() {
            if (mainVideo.muted) {
                mainVideo.muted = false;
                unmuteButton.textContent = 'Mute';
                unmuteButton.style.backgroundColor = 'rgba(240, 215, 0, 0.9)';
                unmuteButton.style.color = '#004d26';
            } else {
                mainVideo.muted = true;
                unmuteButton.textContent = 'Unmute';
                unmuteButton.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                unmuteButton.style.color = 'white';
            }
        });

        // Ensure video plays automatically (some browsers require user interaction)
        mainVideo.addEventListener('loadeddata', function() {
            mainVideo.play().catch(function(error) {
                console.log('Autoplay prevented:', error);
            });
        });
    }

    // Small video autoplay
    const smallVideos = document.querySelectorAll('.video-block-small video');
    smallVideos.forEach(function(video) {
        video.addEventListener('loadeddata', function() {
            video.play().catch(function(error) {
                console.log('Small video autoplay prevented:', error);
            });
        });
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });
        
        // Set initial styles for animation
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-block, .text-content, .text-image-block, .central-text-block');
    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .product-block, .text-content, .text-image-block, .central-text-block {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .video-container {
            transition: transform 0.3s ease;
        }
        
        .video-container:hover {
            transform: scale(1.02);
        }
        
        .btn {
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 77, 38, 0.3);
        }
    `;
    document.head.appendChild(style);

    // Handle video errors gracefully
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(function(video) {
        video.addEventListener('error', function() {
            console.log('Video failed to load:', video.src);
            // You could show a placeholder image here
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background-color: #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-family: 'Roboto', sans-serif;
                border-radius: 15px;
            `;
            placeholder.textContent = 'Video not available';
            video.parentNode.replaceChild(placeholder, video);
        });
    });

    console.log('Ponte Reale website loaded successfully!');
});

