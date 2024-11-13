// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/images')
//         .then(response => response.json())
//         .then(images => {
//             if (images.length > 0) {
//                 const randomImage = images[Math.floor(Math.random() * images.length)];
//                 const homeSection = document.getElementById('home');
//                 homeSection.style.backgroundImage = `url('REMAINING WALLS/${randomImage}')`;
//                 homeSection.classList.add('background-opacity');
//             }
//         })
//         .catch(error => console.error('Error fetching images:', error));
// });