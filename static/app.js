document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');

    function createCard(index) {
        const card = document.createElement('div');
        card.className = 'card'; // No 'hidden' since we're not using animations
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `Item ${index}`;
        card.appendChild(link);
        return card;
    }

    // Add a fixed number of cards
    const numberOfCards = 5;
    for (let i = 1; i <= numberOfCards; i++) {
        const newCard = createCard(i);
        scrollContainer.appendChild(newCard);
    }


    let itemCount = 0;
    // Function to add cards continuously
    

    // Add more cards periodically to simulate continuous scrolling
    setInterval(addCards, 10); // Adjust timing to match CSS animation
});
