// Load and display collection data
async function loadCollectionData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        displayCollection(data);
    } catch (error) {
        console.error('Error loading collection data:', error);
    }
}

// Display collection data
function displayCollection(data) {
    // Set collection title and description
    document.getElementById('collection-title').textContent = data.title;
    document.getElementById('collection-description').textContent = data.description;

    // Generate grid items
    const gridContainer = document.getElementById('collection-grid');
    gridContainer.innerHTML = '';

    data.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'collection-item';
        itemDiv.setAttribute('data-item-index', index);

        itemDiv.innerHTML = `
            <img src="./images/${item.image}" 
                 alt="${item.title}"
                 class="collection-img">
        `;

        itemDiv.addEventListener('click', () => openDetail(index));
        gridContainer.appendChild(itemDiv);
    });

    // Store data globally for detail view
    window.collectionData = data;
}

// Open detail view
function openDetail(index) {
    const item = window.collectionData.items[index];

    document.getElementById('detail-img').src = `./images/${item.image}`;
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCollectionData);

// Handle escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('product-detail').style.display === 'block') {
        closeDetail();
        history.back();
    }
});