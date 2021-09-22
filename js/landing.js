//RememberMe
if ((localStorage.getItem("user") !== null) && localStorage.user !== "") {
    email.value = JSON.parse(localStorage.user).email
    password.value = JSON.parse(localStorage.user).password
    validate()
}

//FormSubmit
document.getElementById("formId").addEventListener("submit", validate)

//Login
function validate() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const emailCheck = Users.find(
        a => a.email == email.value
    );
    if (emailCheck != null && emailCheck.password == password.value) {

        document.getElementById("login").style.display = "none";
        document.getElementById("notes").style.display = "flex";
        document.getElementById("logOff").style.display = "inherit";

        localStorage.setItem('user', JSON.stringify(emailCheck));

        //Note List Generator
        const userNotes = Notes.filter(note => note.authorId == JSON.parse(localStorage.user).id)
        for (const note of userNotes) {
            let link = document.createElement("li")
            link.innerHTML = `<a href="/note.html" class="noteLink" id="${note.id}"><h2 class="title"> ${note.title} </h2><span class="date"> ${note.created_at} </span></a>`
            let parent = document.getElementById("noteList")
            parent.appendChild(link)

        }
    } else {
        let retry = document.createElement("p")
        retry.innerText = "Wrong Email or Password, please try again."
        let parent = document.getElementById("formContainer")
        parent.appendChild(retry)
    }
}

//LogOff
function logOff() {
    localStorage.removeItem("user")
    location.reload();
}

//LoadNote
noteListLength = document.getElementById("noteList").getElementsByTagName("li").length
for(let i = 0; i < noteListLength; i++){
    document.getElementsByClassName("noteLink")[i].addEventListener("click", saveNote)
}

function saveNote() {
    const noteSearchById = Notes.find(
        a => a.id == this.id
    );
    sessionStorage.setItem('savedNote', JSON.stringify(noteSearchById))
}
