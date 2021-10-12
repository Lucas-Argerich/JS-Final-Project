//RememberMe
if ((localStorage.getItem("user") !== null) && localStorage.user !== "") {
    email.value = JSON.parse(localStorage.user).email
    password.value = JSON.parse(localStorage.user).password
    validate()
}

//Submit
$("#formId").on("submit", function () {
    if (this.className == "onRegister") {
        register()
    } else {
        validate()
    }
    return false
})

//Register
$("#registerButton").on("click", registerForm)

function registerForm() {
    $(".name").text("Join Us!")
    $("#registerButton").remove()
    $("#formContainer").append("<h3 id='goLogin'>Already have an account? Log in!</h3>")
    $("#goLogin").on("click", function () {
        location.reload()
    })
    $("#formId").addClass("onRegister")
    $("#formId").prepend('<input type="text" name="nameLastName" id="nameLastName" placeholder="First and Last Name">')
    $("#email, #password").attr("readonly", "on").val("").on("focus", function () {
        this.removeAttribute("readonly", null)
    })
    $("#formId").append('<input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat Password">')
    return false
}

function register() {
    let UserList = JSON.parse(localStorage.Users)
    let userToAdd = {}
    userToAdd.id = 0
    for (let i = 0; i < UserList.length; i++) {
        if (UserList[i].id > userToAdd.id) {
            userToAdd.id = UserList[i].id + 1
        }
    }
    if ($("#nameLastName").val().length > 0 && $("#email").val().length > 0 && $("#password").val().length > 0) {
        const firstAndLastName = $("#nameLastName").val().split(" ")
        userToAdd.firstName = firstAndLastName.slice(0, -1).join(" ")
        userToAdd.lastName = firstAndLastName.slice(-1).toString()

        if (UserList.find(a => a.email == $("#email").val()) == undefined) {
            userToAdd.email = $("#email").val()

            if ($("#password").val() === $("#repeatPassword").val()) {
                userToAdd.password = $("#password").val()
                localStorage.setItem("user", JSON.stringify(userToAdd))
                UserList.push(userToAdd)
                localStorage.setItem("Users", JSON.stringify(UserList))
                let newNote = {}
                newNote.id = Math.random().toString(36).substr(2, 9)
                newNote.title = "Welcome to My Notes!"
                newNote.content = "Thanks for join us! Here, you can make your annotations for only you to see. \nEnjoy!"
                newNote.created_at = Date()
                newNote.edited_at = Date()
                newNote.authorId = JSON.parse(localStorage.user).id
                sessionStorage.setItem("savedNote", JSON.stringify(newNote))
                window.location = "edit.html"                
            } else {
                $("#formId").append("<p>Passwords don't match. Please, try again!</p>")
                return false
            }
        } else {
            $("#formId").append("<p>This email is already being used.</p>")
            return false
        }
    } else {
        $("#formId").append("<p>Fill all parameters to register.</p>")
        return false
    }
}


//Login

function validate() {
    let email = $("#email");
    let password = $("#password");

    const emailCheck = JSON.parse(localStorage.Users).find(
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
        $("#formId").append("<p>Wrong Email or Password, please try again.</p>")
    }
    return false
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
