window.addEventListener('load', () => {
    ShowNotes();
});

function OpenURL(href){
    return window.location.href = `${href}`
}

async function ShowNotes() {
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/notes/${UserID}`).then((response) => response.data);

    const content = document.getElementById('tableBody');

    let indice = 0;
    let i = 1;
    data.forEach((note) => {
        content.innerHTML += `
        <tr> 
            <td>${i}</td>
            <td>${note.title}</td>
            <td>${note.description}</td>
            <td>
                <button class='blue-btn' onclick="editNote(${indice})"><i class="material-icons pointer">edit</i></button>
                <button class = 'red-btn' onclick="deleteNote(${indice})"><i class="material-icons pointer">delete</i></button>
                <button class = 'green-btn' onclick="CheckNote(${indice})"><i class="material-icons pointer">check_circle</i></button>
            </td>
        </tr>
        `
        i++
        indice++
    });
}

function CreateNewNote(){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf);

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if(!title){
        document.getElementById('title').classList.add('red-input');
        document.getElementById('title').placeholder = 'Enter a Title';
        
        return setTimeout(() => {
            document.getElementById('title').classList.remove('red-input');
            document.getElementById('title').placeholder = 'Title';
        }, 3000);
    }

    if(!description){
        document.getElementById('description').classList.add('red-input');
        document.getElementById('description').placeholder = 'Enter a Description';
        
        return setTimeout(() => {
            document.getElementById('description').classList.remove('red-input');
            document.getElementById('description').placeholder = 'Description';
        }, 3000);
    }

    const newNote = axios.post(`https://growdev-backend-recados.herokuapp.com/notes/${UserID}`, {title: title, description: description});

    newNote.catch((error) => modalCreateNoteFail(error.response.data.msg))
    newNote.then(() => OpenURL('notes.html'))
}

function modalCreateNoteFail(errorMsg){
    var myModal = new bootstrap.Modal(document.getElementById('CreateNoteFail'), {});
    myModal.show();

    document.getElementById('errorCreateNote').innerHTML = errorMsg;
}

async function editNote(indice){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/notes/${UserID}`).then((response) => response.data);

    const SelectedObject = data[indice];

    document.getElementById('editedTitle').value = SelectedObject.title;
    document.getElementById('editedDescription').value = SelectedObject.description;

    const NoteID = JSON.stringify(SelectedObject.id);
    localStorage.setItem('NoteID', NoteID)

    openModalToEdit();
}

function SaveChanges(){
    const NoteInf = localStorage.getItem('NoteID');
    const NoteID = JSON.parse(NoteInf);

    const title = document.getElementById('editedTitle').value;
    const description = document.getElementById('editedDescription').value;

    if(!title) {
        document.getElementById('editedTitle').classList.add('red-input');
        document.getElementById('editedTitle').placeholder = "Enter a Title";

        return setTimeout(() => {
            document.getElementById('editedTitle').classList.remove('red-input')
            document.getElementById('editedTitle').placeholder = 'Title';
        }, 3000);
    }

    if(!description) {
        document.getElementById('editedDescription').classList.add('red-input');
        document.getElementById('editedDescription').placeholder = "Enter a Description";

        return setTimeout(() => {
            document.getElementById('editedDescription').classList.remove('red-input')
            document.getElementById('editedDescription').placeholder = 'Descrption';
        }, 3000);
    }

    const AttNote = axios.put(`https://growdev-backend-recados.herokuapp.com/notes/${NoteID}`, {title: title, description: description});

    AttNote.then(() => OpenURL('notes.html'));
}

function openModalToEdit(){
    var myModal = new bootstrap.Modal(document.getElementById('editNoteModal'), {});
    myModal.show();
}

async function deleteNote(indice){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/notes/${UserID}`).then((response) => response.data);

    const SelectedObject = data[indice];

    document.getElementById('deleteText').innerHTML = `Do you really want to delete this note: ${SelectedObject.title}?`

    const NoteID = JSON.stringify(SelectedObject.id);
    localStorage.setItem('NoteID', NoteID)

    openModalToConfirmDelete();
}

async function confirmDelete(){
    const NoteInf = localStorage.getItem('NoteID');
    const NoteID = JSON.parse(NoteInf);

    axios.delete(`https://growdev-backend-recados.herokuapp.com/notes/${NoteID}`).then(() => OpenURL('notes.html'))
}

function openModalToConfirmDelete(){
    var myModal = new bootstrap.Modal(document.getElementById('confirmDelete'), {});
    myModal.show();
}

async function CheckNote(indice){
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/notes/${UserID}`).then((response) => response.data);

    const SelectedObject = data[indice];

    document.getElementById('checkText').innerHTML = `Do you really want to check it as done: ${SelectedObject.title}?`

    const NoteID = JSON.stringify(SelectedObject.id);
    localStorage.setItem('NoteID', NoteID)

    openModalToConfirmCheck();
}

function openModalToConfirmCheck(){
    var myModal = new bootstrap.Modal(document.getElementById('confirmCheck'), {});
    myModal.show();
}

async function confirmCheck(){
    const NoteInf = localStorage.getItem('NoteID');
    const NoteID = JSON.parse(NoteInf);

    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/notes/user/${NoteID}`).then((response) => {return response.data});

    await axios.post(`https://growdev-backend-recados.herokuapp.com/noteschecked/${UserID}`, {title: data.title, description: data.description});

    await axios.delete(`https://growdev-backend-recados.herokuapp.com/notes/${NoteID}`).then(() => OpenURL('notes.html'));
}

document.getElementById('homePage').addEventListener('click', () => {
    OpenURL('notes.html');
});

document.getElementById('checkedNotes').addEventListener('click', () => {
    OpenURL('checked-notes.html');
});

function Logout(){
    localStorage.removeItem('UserInf');
    localStorage.removeItem('NoteID');
    OpenURL('index.html');
}