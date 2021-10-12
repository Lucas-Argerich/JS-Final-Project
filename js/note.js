if (localStorage.getItem("Notes") == null || localStorage.getItem("user") == null) {
    window.location = "index.html"
}

//Header
$("#h1").on("click", function () {
    window.location = "index.html"
})

asideToggleCheckbox = $("#ToggleNav").on("click", function () {
    if (this.checked) {
        $("#aside").css("display", "flex")
    } else {
        $("#aside").css("display", "none")
    }
})

//Aside
const userNotes = JSON.parse(localStorage.Notes).filter(note => note.authorId == JSON.parse(localStorage.user).id)
userNotes.sort((a, b) => {
    return new Date(b.edited_at) - new Date(a.edited_at)
})

for (const note of userNotes) {
    $("#noteList").append(`
        <a class="asideNoteInline noteInlineAnchor" id="${note.id}">
            <h3 class="asideNoteTitle">${note.title}</h3><h3 class="asideNoteDate">${("0" + new Date(note.created_at).getDate()).slice(-2)}/${("0" + (new Date(note.created_at).getMonth() + 1)).slice(-2)}</h3>
        </a>
    `)
}

$.each($(".noteInlineAnchor"), function () {
    $(this).on("click", saveNote)
})

function saveNote() {
    const noteSearchById = JSON.parse(localStorage.Notes).find(
        a => a.id == this.id
    );
    sessionStorage.setItem('savedNote', JSON.stringify(noteSearchById))
    window.location = "note.html"
}

function logOff() {
    localStorage.removeItem("user")
    sessionStorage.removeItem("savedNote")
    window.location = "index.html"
}


function edit() {
    window.location = "edit.html"
}


//NOTE LOADER

if (userNotes.length == 0 && sessionStorage.getItem("savedNote") == null) {
    if (window.location.href.indexOf("note.html") == -1) {
        window.location = "note.html"
    }

    if (localStorage.getItem("noNotesStartDate") == null) {
        let dateStart = Date.now()
        localStorage.setItem("noNotesStartDate", dateStart)
    }

    let counterCalc
    update()
    $("main").append(`<p class="noNotes"></p>`)
    function update() {
        counterCalc = (Date.now() - localStorage.noNotesStartDate) / 1000
        loadCounter()
    }

    function loadCounter() {
        let counterHours = Math.floor(counterCalc / 3600) % 24

        if (counterHours.toString().length < 2) {
            counterHours = ("0" + counterHours).slice(-2)
        }

        let counterMinutes = ("0" + Math.floor(counterCalc / 60) % 60).slice(-2)
        let counterSeconds = ("0" + Math.floor(counterCalc) % 60).slice(-2)
        $("#creationDateDiv, #lastChangeDiv, #todaysDateDiv, #titleContainer, #textContainer, #editButton, #deleteButton").css("display", "none")
        $("main .noNotes").html(`YOUR NOTES HAVE BEEN EMPTY FOR <br><span id="hoursWithoutNotes">${counterHours.toString()}</span>:<span id="hoursWithoutNotes">${counterMinutes.toString()}</span>:<span id="hoursWithoutNotes">${counterSeconds.toString()}</span><br>😢`)
    }
    setInterval(update, 1000)   

} else {

    localStorage.removeItem("noNotesStartDate")
    $("#creationDateDiv, #lastChangeDiv, #todaysDateDiv, #titleContainer, #textContainer, #editButton, #deleteButton").css("display", "")
    $("main").remove(".noNotes")
}

if (userNotes.length != 0 && sessionStorage.getItem("savedNote") == null) {
    newNoteCreator()
}

//Head Title
let title = document.createElement("title")
if (sessionStorage.getItem("savedNote") != null && JSON.parse(sessionStorage.savedNote).title != "") {
    title.innerText = `${JSON.parse(sessionStorage.savedNote).title} | My Notes`
} else {
    title.innerText = `My Notes`
}
document.head.append(title)

if (sessionStorage.getItem("savedNote") != null && window.location.href.indexOf("note.html") != -1) {
    //Title
    $("#titleContainer").append(`<h2>${JSON.parse(sessionStorage.savedNote).title}</h2>`)

    //Content
    $("#textContainer").append(`<p>${JSON.parse(sessionStorage.savedNote).content}</p>`)

    //Creation Date
    $("#creationDateDiv").prepend(`<span class="bigDate">${("0" + new Date(JSON.parse(sessionStorage.savedNote).created_at).getDate()).slice(-2)}/${("0" + (new Date(JSON.parse(sessionStorage.savedNote).created_at).getMonth() + 1)).slice(-2)}/${new Date(JSON.parse(sessionStorage.savedNote).created_at).getFullYear()}</span>`)

    //Last Edit Date
    $("#lastChangeDiv").prepend(`<span class="bigDate">${("0" + new Date(JSON.parse(sessionStorage.savedNote).edited_at).getDate()).slice(-2)}/${("0" + (new Date(JSON.parse(sessionStorage.savedNote).edited_at).getMonth() + 1)).slice(-2)}/${new Date(JSON.parse(sessionStorage.savedNote).edited_at).getFullYear()}</span>`)

    //Today's bigDate
    $("#todaysDateDiv").prepend(`<span class="bigDate">${("0" + new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}</span>`)

    //Note Edit
    $("#editButton").on("click", function () {
        location = "edit.html"
    })

    //Note Delete
    $("#deleteButton").on("click", function () {
        notesWithoutDeleted = JSON.parse(localStorage.Notes).filter(note => note.id != JSON.parse(sessionStorage.savedNote).id)
        localStorage.Notes = JSON.stringify(notesWithoutDeleted)
        sessionStorage.removeItem("savedNote")
        window.location = "index.html"
    })
}

if (window.location.href.indexOf("edit.html") != -1) {
    //Title
    $("#editTitleContainer").val(JSON.parse(sessionStorage.savedNote).title)

    //Content
    $("#editTextContainer").val(JSON.parse(sessionStorage.savedNote).content)

    //Edit Cancel
    $("#cancelButton").on("click", function () {
        window.location = "note.html"
    })

    //Edit Save
    $("#saveButton").on("click", function () {
        if ($("#editTextContainer").val() !== "" || $("#editTitleContainer").val() != "Unnamed Note") {
            let noteSave = JSON.parse(sessionStorage.savedNote)
            noteSave.title = $("#editTitleContainer").val()
            noteSave.content = $("#editTextContainer").val()
            noteSave.edited_at = Date()
            sessionStorage.setItem("savedNote", JSON.stringify(noteSave))

            let noteList = JSON.parse(localStorage.Notes)
            const noteToEdit = JSON.parse(localStorage.Notes).findIndex(element => element.id == noteSave.id)
            if (noteToEdit != -1) {
                noteList[noteToEdit] = noteSave
                localStorage.setItem("Notes", JSON.stringify(noteList))
            } else {
                noteList.push(noteSave)
                localStorage.setItem("Notes", JSON.stringify(noteList))
            }
        }else{
            sessionStorage.removeItem("savedNote")
        }
        window.location = "note.html"

    })
}