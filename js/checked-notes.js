window.addEventListener('load', () => {
    ShowCheckedNotes();
});

function OpenURL(href){
    return window.location.href = `${href}`
}

async function ShowCheckedNotes() {
    const UserInf = localStorage.getItem('UserInf');
    const UserID = JSON.parse(UserInf)

    const data = await axios.get(`https://growdev-backend-recados.herokuapp.com/noteschecked/${UserID}`).then((response) => response.data);

    const content = document.getElementById('tableBody');

    let i = 1;
    data.forEach((note) => {
        content.innerHTML += `
        <tr> 
            <td>${i}</td>
            <td>${note.title}</td>
            <td>${note.description}</td>
            <td>${Date(note.date)}</td>
        </tr>
        `
        i++
    });
} 

function Logout(){
    localStorage.removeItem('UserInf');
    localStorage.removeItem('NoteID');
    OpenURL('index.html');
}

document.getElementById('homePage').addEventListener('click', () => {
    OpenURL('notes.html');
});



