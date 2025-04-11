// Load and display collection preview
async function loadCollectionPreview() {
    try {
        const response = await fetch('collections/bulgarian-broderie/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        displayCollectionPreview(data);
    } catch (error) {
        console.error('Error loading collection preview:', error);
    }
}

// Display collection preview
function displayCollectionPreview(data) {
    const gridContainer = document.getElementById('home-collection-grid');
    if (!gridContainer) return; // Exit if container not found

    gridContainer.innerHTML = '';

    // Determine how many items to show based on screen width
    const isMobile = window.innerWidth <= 768;
    const itemsToShow = isMobile ? 1 : 4;

    // Only show the first item (or 4 on desktop)
    data.items.slice(0, itemsToShow).forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'collection-item';
        if (index > 0) {
            itemDiv.classList.add('desktop-only');
        }

        itemDiv.innerHTML = `
            <img src="collections/bulgarian-broderie/images/${item.image}" 
                 alt="${item.title}"
                 class="collection-img">
        `;

        itemDiv.addEventListener('click', () => {
            window.location.href = 'collections/bulgarian-broderie/index.html';
        });

        gridContainer.appendChild(itemDiv);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.collectionData) {
        displayCollectionPreview(window.collectionData);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCollectionPreview);


