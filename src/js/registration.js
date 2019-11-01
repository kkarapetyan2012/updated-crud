const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const reg = document.getElementById('reg');

// if(lastname.value != '' || username.value != '' || email.value != '' || password.value != '') {
//     reg.disabled = false;
// } else {
//     // reg.disabled = true;
// }

const url = 'https://it-blog-posts.herokuapp.com/api/';
const endpoint1 = 'people';
const endpoint2 = 'login';

reg.addEventListener("click", () => {
    
    fetch (
        `${url}${endpoint1}`,
        {
            method: 'POST',
            body: JSON.stringify({
                firstname: `${firstname.value}`,
                lastname:  `${lastname.value}`,
                username:  `${username.value}`,
                password:  `${password.value}`,
                email:     `${email.value}`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then(res => res.json())
    .then(data => {
        window.open("login.html")
        console.log(data);
        return data;
    })
    .catch(function(err) {
        console.log("Error: ", err)
    });

});