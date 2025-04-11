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
    if (!gridContainer) {
        console.error('Grid container not found!');
        return;
    }

    gridContainer.innerHTML = '';

    // Always create first item
    const firstItem = data.items[0];
    const firstItemDiv = document.createElement('div');
    firstItemDiv.className = 'collection-item';
    firstItemDiv.innerHTML = `
        <img src="collections/bulgarian-broderie/images/${firstItem.image}" 
             alt="${firstItem.title}"
             class="collection-img">
    `;
    firstItemDiv.addEventListener('click', () => {
        window.location.href = 'collections/bulgarian-broderie/index.html';
    });
    gridContainer.appendChild(firstItemDiv);

    // Only add additional items if not mobile
    if (window.innerWidth > 768) {
        data.items.slice(1, 4).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'collection-item desktop-only';
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
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.collectionData) {
        displayCollectionPreview(window.collectionData);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCollectionPreview);



