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

    let itemCount = numberOfCards; // Start count based on initial cards

    // Function to add cards up to a maximum limit
    function addCards() {
        if (itemCount < 10) { // Set the limit of cards here
            itemCount++;
            const newCard = createCard(itemCount);
            scrollContainer.appendChild(newCard);
        }
    }
   

