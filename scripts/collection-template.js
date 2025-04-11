// Load and display collection data
async function loadCollectionData() {
    try {
        // Log the fetch attempt
        console.log('Attempting to load data...');

        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Log the data to see what we received
        console.log('Data loaded:', data);

        displayCollection(data);
    } catch (error) {
        console.error('Error loading collection data:', error);
        // Show error on page
        document.getElementById('collection-grid').innerHTML =
            '<p>Error loading collection. Please try again later.</p>';
    }
}

// Display collection data
function displayCollection(data) {
    if (!data || !data.items) {
        console.error('Invalid data format:', data);
        return;
    }

    // Set collection title and description
    document.getElementById('collection-title').textContent = data.title || 'Collection';
    document.getElementById('collection-description').textContent = data.description || '';

    // Generate grid items
    const gridContainer = document.getElementById('collection-grid');
    gridContainer.innerHTML = '';

    data.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'collection-item';

        itemDiv.innerHTML = `
            <img src="images/${item.image}" 
                 alt="${item.title}"
                 class="collection-img">
        `;

        itemDiv.addEventListener('click', () => openDetail(index));
        gridContainer.appendChild(itemDiv);
    });

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
