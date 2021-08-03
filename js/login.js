function OpenURL(href){
    return window.location.href = `${href}`
}

function showPassword(){        
    const input = document.getElementById('password');
    const icon = document.getElementById('visibility');
    
    if(input.type === 'password'){
        input.type = 'text';
        icon.innerHTML = 'visibility';
    } else {
        input.type = 'password';
        icon.innerHTML = 'visibility_off';
    }
}

async function login(){
    const listOfUsers = await axios.get("https://growdev-backend-recados.herokuapp.com/user").then((response) => {
        return(response.data);
    });

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = listOfUsers.find((f) => f.username === username);

    if (!user){
        return modalLoginFailbyUsername();
    } 
    if(user.password !== password){
        return modalLoginFailbyPassword();
    }

    const UserInf = JSON.stringify(user.id);
    localStorage.setItem('UserInf', UserInf);

    if(user.username === username && user.password === password){
        return OpenURL('notes.html');
    }
}

function modalLoginFailbyUsername(){
    var myModal = new bootstrap.Modal(document.getElementById('loginFailbyUser'), {});
    myModal.show();
}

function modalLoginFailbyPassword(){
    var myModal = new bootstrap.Modal(document.getElementById('loginFailbyPassword'), {});
    myModal.show();
}