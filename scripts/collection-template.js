// Get the collection name from the URL pathfunction getCollectionPathFromUrl() {
const path = window.location.pathname; const pathSegments = path.split('/').filter(segment => segment !== '');
// Look for 'collections' and the following segment
const collectionsIndex = pathSegments.indexOf('collections'); if (collectionsIndex !== -1 && pathSegments.length > collectionsIndex + 1) {
    return pathSegments[collectionsIndex + 1];
}
return 'bulgarian-broderie';

// Load collection dataasync function loadCollectionData() {
const collectionPath = getCollectionPathFromUrl();
try {
    // Use the correct path to data.json relative to the collection folder
    const response = await fetch('./data.json');

    if (!response.ok) {
        throw new Error(`Failed to load collection data: ${response.status}`);
    }
    const data = await response.json();
    displayCollection(data, collectionPath);
} catch (error) {
    console.error('Error loading collection data:', error);
    // Add more detailed error message
    console.error('Failed to load from path:', window.location.pathname);
    document.getElementById('collection-description').textContent = 'Unable to load collection data. Please try again later.';
    document.getElementById('collection-grid').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0;">
            <p>Error loading collection. Please check console for details.</p>
        </div>
    `;
}
}
// Display collection datafunction displayCollection(data, collectionPath) {
// Set collection title and description    document.getElementById('collection-title').textContent = data.title;
document.getElementById('collection-description').textContent = data.description; document.title = `${data.title} | IVANKA RAYKOVA`;
// Generate grid items
const gridContainer = document.getElementById('collection-grid'); gridContainer.innerHTML = '';
// Use fragment for better performance
const fragment = document.createDocumentFragment();
data.items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'collection-item'; itemDiv.setAttribute('data-item-index', index);
    itemDiv.innerHTML = `            <img src="./images/${item.image}" 
                 alt="${item.title}"                  class="collection-img">
        `;
    // Use event delegation instead of inline onclick        itemDiv.addEventListener('click', function() {
    openDetail(index);
});
fragment.appendChild(itemDiv);
    });
gridContainer.appendChild(fragment);
// Fade in grid items with staggered delay    const items = document.querySelectorAll('.collection-item');
items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)'; item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
        item.style.opacity = '1'; item.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
});
// Store the collection data globally for detail view access
window.collectionData = {
    items: data.items,
    path: collectionPath
};
}
// Open detail view for a productfunction openDetail(index) {
const item = window.collectionData.items[index];
// Set detail view content    document.getElementById('detail-img').src = `./images/${item.image}`;
document.getElementById('detail-img').alt = item.title; document.getElementById('detail-title').textContent = item.title;
document.getElementById('detail-description').innerHTML = item.description; document.getElementById('detail-material').textContent = item.material;
document.getElementById('detail-fabric').textContent = item.fabric; document.getElementById('detail-craftsmanship').textContent = item.craftsmanship;
// Show detail view
const detailView = document.getElementById('product-detail'); detailView.style.display = 'block';
document.body.style.overflow = 'hidden';
// Update URL without refreshing the page    const newUrl = `${window.location.pathname}#item-${index}`;
history.pushState({ itemIndex: index }, '', newUrl);}
// Close detail view
function closeDetail() {
    const detailView = document.getElementById('product-detail');
    detailView.style.display = 'none'; document.body.style.overflow = '';
}
// Header scroll effectconst header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
    }
});
// Close detail view when clicking escape keywindow.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && document.getElementById('product-detail').style.display === 'block') {
    closeDetail();
    history.back();
}
});
// Add subtle parallax scrollingwindow.addEventListener('scroll', () => {
const scrollPosition = window.scrollY; const items = document.querySelectorAll('.collection-item');
items.forEach((item, index) => {
    const offset = (index % 2 === 0) ? 0.05 : -0.05;
    item.style.transform = `translateY(${scrollPosition * offset}px)`;
});
});
// Preload images for smoother experiencefunction preloadImages(collectionPath, images) {
images.forEach(image => {
    const img = new Image();
    img.src = `/collections/${collectionPath}/images/${image.image}`;
});
}
// Add accessibility improvementsfunction enhanceAccessibility() {
// Make collection items keyboard accessible    const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button'); item.setAttribute('aria-label', `View ${item.querySelector('img').alt} details`);
    // Handle keyboard event
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); const index = item.getAttribute('data-item-index');
            openDetail(parseInt(index));
        }
    });
});
// Make close button more accessible
const closeButton = document.querySelector('.close-detail'); closeButton.setAttribute('aria-label', 'Close detail view');
closeButton.setAttribute('role', 'button'); closeButton.setAttribute('tabindex', '0');
// Handle keyboard event for close button
closeButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); closeDetail();
        history.back();
    }
});}
// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    loadCollectionData().then(() => {
        if (window.collectionData) {
            postLoadActions(window.collectionData.items, window.collectionData.path);
        }
    });
});




































































































