// Load and display collection data
async function loadCollectionData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Log the number of items found
        console.log(`Loading ${data.items.length} items from collection`);

        displayCollection(data);
    } catch (error) {
        console.error('Error loading collection data:', error);
        document.getElementById('collection-grid').innerHTML =
            '<p>Error loading collection. Please try again later.</p>';
    }
}

// Display collection data
function displayCollection(data) {
    if (!data || !data.items || !Array.isArray(data.items)) {
        console.error('Invalid data format:', data);
        return;
    }

    // Set collection title and description
    document.getElementById('collection-title').textContent = data.title || 'Collection';
    document.getElementById('collection-description').textContent = data.description || '';

    // Generate grid items
    const gridContainer = document.getElementById('collection-grid');
    gridContainer.innerHTML = ''; // Clear existing content

    // Loop through all items in the data.json
    data.items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'collection-item';

        itemDiv.innerHTML = `
            <img src="images/${item.image}" 
                 alt="${item.title}"
                 class="collection-img">
        `;

        // Add click event to show detail view
        itemDiv.addEventListener('click', () => openDetail(index));
        gridContainer.appendChild(itemDiv);
    });

    // Store data for detail view
    window.collectionData = data;
}

// Open detail view
function openDetail(index) {
    const item = window.collectionData.items[index];

    // Update detail view with item data
    document.getElementById('detail-img').src = `images/${item.image}`;
    document.getElementById('detail-img').alt = item.title;
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-description').textContent = item.description;
    document.getElementById('detail-material').textContent = item.material;
    document.getElementById('detail-fabric').textContent = item.fabric;
    document.getElementById('detail-craftsmanship').textContent = item.craftsmanship;

    // Show the detail view
    document.getElementById('product-detail').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close detail view
function closeDetail() {
    document.getElementById('product-detail').style.display = 'none';
    document.body.style.overflow = 'auto';
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
