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
    gridContainer.innerHTML = '';

    // Determine how many items to show based on screen width
    const isMobile = window.innerWidth <= 768;
    const itemsToShow = isMobile ? 1 : 4;

    // Only show the first 4 items (or 1 on mobile)
    data.items.slice(0, itemsToShow).forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'collection-item';
        
        itemDiv.innerHTML = `
            <img src="collections/bulgarian-broderie/images/${item.image}" 
                 alt="${item.title}"
                 class="collection-img">
        `;

        itemDiv.addEventListener('click', () => openDetail(index, data));
        gridContainer.appendChild(itemDiv);
    });

    // Store data globally for detail view
    window.collectionData = data;
}

// Open detail view
function openDetail(index, data) {
    const item = data.items[index];
    
    document.getElementById('detail-img').src = `collections/bulgarian-broderie/images/${item.image}`;
    document.getElementById('detail-img').alt = item.title;
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-description').textContent = item.description;
    document.getElementById('detail-material').textContent = item.material;
    document.getElementById('detail-fabric').textContent = item.fabric;
    document.getElementById('detail-craftsmanship').textContent = item.craftsmanship;

    document.getElementById('product-detail').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close detail view
function closeDetail() {
    document.getElementById('product-detail').style.display = 'none';
    document.body.style.overflow = '';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.collectionData) {
        displayCollectionPreview(window.collectionData);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCollectionPreview);

// Handle escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('product-detail').style.display === 'block') {
        closeDetail();
    }
});