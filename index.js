import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
	// Get search term
	const searchTerm = searchInput.value;

	// Get sort
	const sortBy = document.querySelector('input[name="sortby"]:checked').value;
	
	// Get limit
	const searchLimit = document.getElementById('limit').value;

	// Input validation
	if(searchTerm === ''){
		// Show a message
		showMessage('Please add a search term', 'alert-danger') // Takes the message + class
	}

	// Search Reddit
	reddit.search(searchTerm, searchLimit, sortBy).then(results => {
		let output = '<div class="card-columns">';
		// Loop through posts
		results.forEach(post => {
			// Check for image 
			const image = post.preview ? post.preview.images[0].source.url : 'data:image/png;base64,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';

			output += `
				<div class="card">
				  <a target="_blank" href="${post.url}"><img src="${image}" class="card-img-top" alt="..."></a>
				  <div class="card-body">
				    <h5 class="card-title">${post.title}</h5>
				    <p class="card-text">${truncateText(post.selftext, 100)}</p>
				    <a target="_blank" href="${post.url}" class="btn btn-sm" style="background-color: #FF5700; color:white;">Read More...</a>
				    <hr>
				    <span class="badge badge-secondary">Subreddit: <a target="_blank" href="https://reddit.com/r/${post.subreddit}">${post.subreddit}</a></span>
				    <span class="badge badge-dark">Score: ${post.score}</span>
				  </div>
				</div>
			`
		});
		output += '</div>'
		document.getElementById('results').innerHTML = output;
	});


	e.preventDefault();
});


function showMessage(message, className){
	// Create the div
	const div = document.createElement('div');

	// Add class
	div.className = `alert ${className}`;

	// Add text
	div.appendChild(document.createTextNode(message));

	// Get parent container 
	const searchContainer = document.getElementById('search-container');

	// Get search 
	const search = document.getElementById('search');

	// Insert 
	searchContainer.insertBefore(div, search);

	// Timeout alert
	setTimeout(() => document.querySelector('.alert').remove(), 3000);

}


function truncateText(text, limit){
	const shortened = text.indexOf(' ', limit);
	if(shortened == -1){
		return text;
	}
	return text.substring(0, shortened);
}