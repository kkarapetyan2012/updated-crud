
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');

// if(lastname.value != '' || username.value != '' || email.value != '' || password.value != '') {
//     reg.disabled = false;
// } else {
//     // reg.disabled = true;
// }

const url = 'https://it-blog-posts.herokuapp.com/api/';
const endpoint1 = 'people';
const endpoint2 = 'login';
const url2 = 'https://it-blog-posts.herokuapp.com/api/meetups/?access_token=';

login.addEventListener("click", () => {
    
    fetch (
        `${url}${endpoint1}/${endpoint2}`,
        {
            method: 'POST',
            body: JSON.stringify({
                username: `${username.value}`,
                password: `${password.value}`,
                email:    `${email.value}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        getFetch(data.id)
    })
    .catch(function(err) {
        console.log("Error: ", err)
    });

});


getFetch = (token) => {
    fetch (
        `${url2}${token}`
    )
    .then(res => res.json())
    .then(data => {
        window.open("news.html")
        console.log(data);
        return data;
    })
    .catch(function(err) {
        console.log("Error: ", err)
    });
}