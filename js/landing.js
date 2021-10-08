//RememberMe
if ((localStorage.getItem("user") !== null) && localStorage.user !== "") {
    email.value = JSON.parse(localStorage.user).email
    password.value = JSON.parse(localStorage.user).password
    validate()
}

//FormSubmit
$("#formId").on("submit", validate)

//Login
function validate() {
    let email = $("#email");
    let password = $("#password");

    const emailCheck = Users.find(
        a => a.email == email.val()
    );
    if (emailCheck != null && emailCheck.password == password.val()) {
        $("#login").css("display", "none");
        $("#notes").css("display", "flex");
        $("#logOff").css("display", "inherit");

        localStorage.setItem('user', JSON.stringify(emailCheck));

        //Note List Generator
        const userNotes = JSON.parse(localStorage.Notes).filter(note => note.authorId == JSON.parse(localStorage.user).id)
        userNotes.sort((a, b) => {
            return new Date(b.edited_at) - new Date(a.edited_at)
        });
        if (userNotes.length == 0) {
            window.location = "note.html";
        } else {
            for (const note of userNotes) {
                $("#noteList").append(`
                <li>
                    <a href="note.html" class="noteLink" id="${note.id}">
                        <h2 class="title">${note.title}</h2>
                        <span class="date"> ${("0" + new Date(note.created_at).getDate()).slice(-2)}/${("0" + (new Date(note.created_at).getMonth() + 1)).slice(-2)}/${new Date(note.created_at).getFullYear()}</span>
                    </a>
                </li>
                `)
            }
        }
    } else {
        $("#formContainer").append("<p>Wrong Email or Password, please try again.</p>")
    }
}

//LogOff
function logOff() {
    localStorage.removeItem("user")
    sessionStorage.removeItem("savedNote")
    location.reload();
}

//LoadNote
noteListLength = $("#noteList, li").length
for (let i = 0; i < noteListLength; i++) {
    $(".noteLink", [i]).on("click", saveNote)
}

function saveNote() {
    const noteSearchById = JSON.parse(localStorage.Notes).find(
        a => a.id == this.id
    );
    sessionStorage.setItem('savedNote', JSON.stringify(noteSearchById))
}
