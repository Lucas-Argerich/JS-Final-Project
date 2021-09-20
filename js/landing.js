//RememberMe
if (localStorage.user !== "") {
    email.value = JSON.parse(localStorage.user).email
    password.value = JSON.parse(localStorage.user).password
    validate()
}

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

        //Note List Loader
        const userNotes = Notes.filter(note => note.authorId == JSON.parse(localStorage.user).id)
        for (const note of userNotes) {
            let link = document.createElement("li")
            link.innerHTML = `<a href=""><h2 class="title"> ${note.title} </h2><span class="date"> ${note.created_at} </span></a>`

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

function logOff() {
    localStorage.user = "";
    location.reload();
}

