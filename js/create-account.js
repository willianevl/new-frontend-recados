function showCreatePassword(){
    const input = document.getElementById('createPassword');
    const icon = document.getElementById('visibilityCreatePassword');
    if(input.type === 'password'){
        input.type = 'text';
        icon.innerHTML = 'visibility';
    } else {
        input.type = 'password';
        icon.innerHTML = 'visibility_off';
    }
}

function showConfirmPassword(){
    const input = document.getElementById('confirmPassword');
    const icon = document.getElementById('visibilityConfirmPassword');
    if(input.type === 'password'){
        input.type = 'text';
        icon.innerHTML = 'visibility';
    } else {
        input.type = 'password';
        icon.innerHTML = 'visibility_off';
    }
}

async function CreateNewUser(){
    const username = document.getElementById('createUsername').value;
    const password = document.getElementById('createPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if(!username){
        document.getElementById('createUsername').classList.add('red-input');
        document.getElementById('createUsername').placeholder = "What's your username?";

        return setTimeout(() => {
            document.getElementById('createUsername').classList.remove('red-input')
            document.getElementById('createUsername').placeholder = 'Username';
        }, 3000);
    }

    if(!password){
        document.getElementById('createPassword').classList.add('red-input');
        document.getElementById('createPassword').placeholder = "Enter the password";

        return setTimeout(() => {
            document.getElementById('createPassword').classList.remove('red-input')
            document.getElementById('createPassword').placeholder = 'Password';
        }, 3000);
    }

    if(password.length <= 5){
        return modalErrorCreateUser('Enter a combination of at least six number and letters')
    }

    if(confirmPassword !== password){
        document.getElementById('confirmPassword').classList.add('red-input');
        document.getElementById('confirmPassword').placeholder = 'Invalid password';
        return setTimeout(() => {
            document.getElementById('confirmPassword').classList.remove('red-input');
            document.getElementById('confirmPassword').placeholder = 'Confirm password';
        }, 3000);
    }

    const newUser = axios.post("https://growdev-backend-recados.herokuapp.com/user", {username: username, password: password, confirmPassword: confirmPassword});

    newUser.catch((err) => modalErrorCreateUser(err.response.data.msg));
    newUser.then(() => modalSuccessCreateUser());
}

function modalErrorCreateUser(errorMsg){
    var myModal = new bootstrap.Modal(document.getElementById('Fail'), {});
    myModal.show();

    document.getElementById('errorMsg').innerHTML = `${errorMsg}`;
}

function modalSuccessCreateUser(){
    var myModal = new bootstrap.Modal(document.getElementById('Success'), {});
    myModal.show();

    document.getElementById('btnNext').addEventListener('click', () => {
        OpenURL('index.html');
    });
}

function OpenURL(href){
    return window.location.href = `${href}`
}