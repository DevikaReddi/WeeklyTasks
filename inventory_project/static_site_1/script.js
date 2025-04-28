// Replace with the actual URL of your backend API endpoint
const apiUrl = 'http://localhost:8000/api/products/'; // Or '/api/products/' if you have that prefix

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                // Handle HTTP errors (like 404 or 500)
                console.error(`HTTP error! status: ${response.status}`);
                displayError(`Failed to load products. Status: ${response.status}`);
                return null; // Stop further processing
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            if (data && data.products) { // Check if data and the products array exist
                console.log('Products data received:', data);
                displayProducts(data.products); // Call function to display products
            } else if (data) {
                 // Handle cases where the structure might be just an array directly
                 // This depends on how your Django view serializes the response
                 console.log('Data received (assuming direct array):', data);
                 if (Array.isArray(data)) {
                     displayProducts(data);
                 } else {
                    console.error('Received data is not in the expected format:', data);
                    displayError('Received data is not in the expected format.');
                 }
            }
        })
        .catch(error => {
            // Handle network errors or errors during JSON parsing
            console.error('Error fetching products:', error);
            displayError('Error fetching products. Check the console.');
        });
}

function displayProducts(products) {
    const container = document.getElementById('product-list-container');
    if (!container) {
        console.error('Product list container not found!');
        return;
    }

    // Clear any previous content (like placeholders or old data)
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    // Loop through each product and create an HTML tile
    products.forEach(product => {
        // Create the main tile div
        const tile = document.createElement('div');
        tile.className = 'product-tile'; // Use the same class for styling

        // Create and append elements for product details
        const nameElement = document.createElement('h2');
        // NOTE: Your data structure seems nested, adjust access accordingly
        // Example: product.name, product.description, etc. based on your console output
        // The console shows your product data might *not* be directly under `product.`
        // but rather properties of the object in the array. Let's assume direct properties:
        nameElement.textContent = product.name || 'N/A'; // Use default if missing

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = `Description: ${product.description || 'No description'}`;

        const brandElement = document.createElement('p');
        brandElement.textContent = `Brand: ${product.brand || 'N/A'}`;

        const priceElement = document.createElement('p');
        // Format price nicely
        const price = typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A';
        priceElement.textContent = `Price: $${price}`;

        const quantityElement = document.createElement('p');
        quantityElement.textContent = `Quantity: ${product.quantity !== undefined ? product.quantity : 'N/A'}`;

        // Add category if available (check your data structure)
        if (product.category && product.category.$oid) { // Example check if category is a MongoEngine reference
             const categoryElement = document.createElement('p');
             // You might need another API call to get category details based on the OID,
             // or adjust your product listing API to include category title directly.
             // For now, just show the ID.
             categoryElement.textContent = `Category ID: ${product.category.$oid}`;
             tile.appendChild(categoryElement);
        }


        // Append all elements to the tile
        tile.appendChild(nameElement);
        tile.appendChild(descriptionElement);
        tile.appendChild(brandElement);
        tile.appendChild(priceElement);
        tile.appendChild(quantityElement);


        // Append the tile to the container
        container.appendChild(tile);
    });
}

function displayError(message) {
     const container = document.getElementById('product-list-container');
     if (container) {
         container.innerHTML = `<p class="error-message">${message}</p>`;
     }
}