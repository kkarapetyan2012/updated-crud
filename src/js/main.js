const url = 'https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/';
const endpoint = 'item';

const $ = function (selector) { // reusable function for shorthed
	return document.querySelector(selector); // select all html tag by give selector like in css 
}


/*** function get fetch and added avatar images and title ***/
const users = function () {
	fetch("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/users")
	.then(response => response.json())
	.then(data => {
		data.forEach(blogger => {

			const aside = document.getElementById('aside');
			const div = document.createElement('div');

			const avatarBlock = aside.appendChild(div);
			avatarBlock.classList.add('avatar', 'd-flex', 'box-shadow', 'align-items_center');
			const avatarImg = document.createElement('div');

			avatarBlock.appendChild(avatarImg);
			avatarImg.classList.add('avatar-img');
			const img = document.createElement('img');
			avatarImg.appendChild(img);
			img.src = `${blogger.avatar}`;

			const avatarTitle = document.createElement('div');
			avatarBlock.appendChild(avatarTitle);
			avatarTitle.innerHTML = `${blogger.name}`;
			avatarTitle.classList.add('avatar-title');
		})
	})
	.catch(function (err) {
		console.log("Error", err);
	});
}


const articles = function () {
	fetch("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/postblog")
	.then(response => response.json())
	.then(data => {
		data.forEach(postblog => {
			
			const articleContainer = document.getElementById('article-container');

			const div = document.createElement('div');

			const articleBlock = articleContainer.appendChild(div);
			articleBlock.classList.add('article');

			const authorName = document.createElement('div');
			authorName.classList.add('authorName');
			//articleBlock.appendChild(authorName);

			const postTitle = document.createElement('div');
			postTitle.classList.add('postTitle');
			articleBlock.appendChild(postTitle);

			const header = document.createElement('header');
			articleBlock.appendChild(header);
			header.classList.add('d-flex', 'justify-content_space-between', 'article-header');
			header.appendChild(postTitle);
			header.appendChild(authorName);

			const description = document.createElement('div');
			description.classList.add('description');
			articleBlock.appendChild(description);

			authorName.innerHTML = `${postblog.author}`;
			postTitle.innerHTML = `${postblog.title}`;
			description.innerHTML = `${postblog.description}`;
		})
	})
	.catch(function (err) {
		console.log("Error", err);
	});
}

users();

articles();


/*** create modal window  ***/

let newID = null;

const onReady = function () {
	console.log('DOM Loaded');
	getItemList(function (data) {
		createTable(data);
	})

	const add = document.getElementById('add');
	add.addEventListener('click', function() {
		if(newID) {
			newItem()
		} else {
			createItem();
			onReady()
			// function addPost() {
			// 	createItem();
			// }
		}
	})
}


function showModal() {
	const myModal = document.getElementById('myModal');
	myModal.style.display = 'flex';
}

// function addPost() {
// 	createItem();
// }

const createTable = function (data) {
	const tbody = $('.news-container');
	let template = '';
	for (let i = 0; i < data.length; i++) {
	  
	  const row = `
			<section class="box-shadow">
			  
			  <div class="postTitle">${data[i].postTitle}</div>
			  <div class="description-news">${data[i].description}</div>
			  
			</section>
		`;
  
	  template += row 
	}
	
	tbody.innerHTML = template;
  }

const newItem = function () {
	const postTitle = $('#postTitle');
	const description = $('#description');

	const updateData = {
		postTitle: postTitle.value,
		description: description.value
	}

	fetch (
		`${url}${endpoint}/${newID}`,
		{
			method: "PUT",
			body: JSON.stringify(data), 
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	.then(function (response) {
		if(response.ok && response.status === 200) {
			getItemList(function (data){
				createTable(data)
			})
			postTitle.value = '',
			description.value = ''
		}
	})
	.catch(function (err) {
		console.log("ERROR", err)
	})
}

const getItemList = function (callback) {
	fetch (
		`${url}${endpoint}`
	)
	.then (function (response) {
		if(response.ok && response.status == 200) {
			return response.json()
			.then(function (responseData){
				callback(responseData)
			})
			.catch();
		}
	})
}

const createItem = function () {
	const postTitle = $('#postTitle');
	const description = $('#description'); 

	const data = {
		description: description.value,
		postTitle: postTitle.value		
	}

	fetch (
		`${url}${endpoint}`,
		{
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	.then (function (response) {
		if(response.ok && response.status === 201) {
			getItemList(function (data) {
				createTable(data)
			})
			postTitle.value = '',
			description.value = ''
		}
	})
	.catch(function(err) {
		console.log("ERROR", err)
	})
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// window.onload=function(){
// 	document.getElementById("add").click();
//   };