if (localStorage.getItem("Notes") == null || localStorage.getItem("user") == null) {
    window.location = "index.html"
}

if (sessionStorage.getItem("savedNote") == null) {
    newNoteCreator()
}

//Header
document.getElementById('h1').addEventListener("click", function () {
    window.location = "index.html"
})

asideToggleCheckbox = document.getElementById('ToggleNav').addEventListener("click", function () {
    if (this.checked) {
        document.getElementById('aside').style.display = "flex"
    } else {
        document.getElementById('aside').style.display = "none"
    }
})

//Aside
const userNotes = JSON.parse(localStorage.Notes).filter(note => note.authorId == JSON.parse(localStorage.user).id)
userNotes.sort((a, b) => {
    return new Date(b.edited_at) - new Date(a.edited_at)
})

for (const note of userNotes) {
    let link = document.createElement('a')
    link.className = "asideNoteInline"
    link.id = note.id
    link.innerHTML = `<h3 class="asideNoteTitle"> ${note.title} </h3><h3 class="asideNoteDate"> ${("0" + new Date(note.created_at).getDate()).slice(-2)}/${("0" + (new Date(note.created_at).getMonth() + 1)).slice(-2)}</h3>`

    let parent = document.getElementById("noteList")
    parent.appendChild(link)
}

noteListLength = document.getElementById("noteList").getElementsByTagName("a").length
for (let i = 1; i < noteListLength; i++) {
    document.getElementsByClassName("asideNoteInline")[i].addEventListener("click", saveNote)
}

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

//Head Title
let title = document.createElement("title")
if (JSON.parse(sessionStorage.savedNote).title != "") {
    title.innerText = `${JSON.parse(sessionStorage.savedNote).title} | My Notes`
} else {
    title.innerText = `My Notes`
}
document.head.appendChild(title)

if (window.location.href.indexOf("note.html") != -1) {
    //Title
    let noteTitle = document.createElement("h2")
    noteTitle.innerText = JSON.parse(sessionStorage.savedNote).title
    document.getElementById("titleContainer").appendChild(noteTitle)

    //Content
    let noteContent = document.createElement("p")
    noteContent.innerText = JSON.parse(sessionStorage.savedNote).content
    document.getElementById("textContainer").appendChild(noteContent)

    //Creation Date
    let creationDate = document.createElement("span")
    creationDate.className = "bigDate"
    creationDate.innerText = `${("0" + new Date(JSON.parse(sessionStorage.savedNote).created_at).getDate()).slice(-2)}/${("0" + (new Date(JSON.parse(sessionStorage.savedNote).created_at).getMonth() + 1)).slice(-2)}/${new Date(JSON.parse(sessionStorage.savedNote).created_at).getFullYear()}`
    document.getElementById("creationDateDiv").prepend(creationDate)

    //Last Edit Date
    let lastEditDate = document.createElement("span")
    lastEditDate.className = "bigDate"
    lastEditDate.innerText = `${("0" + new Date(JSON.parse(sessionStorage.savedNote).edited_at).getDate()).slice(-2)}/${("0" + (new Date(JSON.parse(sessionStorage.savedNote).edited_at).getMonth() + 1)).slice(-2)}/${new Date(JSON.parse(sessionStorage.savedNote).edited_at).getFullYear()}`
    document.getElementById("lastChangeDiv").prepend(lastEditDate)

    //Today's bigDate
    let todaysDate = document.createElement("span")
    todaysDate.className = "bigDate"
    todaysDate.innerText = `${("0" + new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}`
    document.getElementById("todaysDateDiv").prepend(todaysDate)

    //Note Edit
    document.getElementById("editButton").addEventListener("click", function () {
        location = "edit.html"
    })

    //Note Delete
    document.getElementById("deleteButton").addEventListener("click", function () {
        notesWithoutDeleted = JSON.parse(localStorage.Notes).filter(note => note.id != JSON.parse(sessionStorage.savedNote).id)
        localStorage.Notes = JSON.stringify(notesWithoutDeleted)
        newNoteCreator()
    })
}

if (window.location.href.indexOf("edit.html") != -1) {
    //Title
    let editTitle = document.getElementById("editTitleContainer")
    editTitle.value = JSON.parse(sessionStorage.savedNote).title

    //Content
    let editContent = document.getElementById("editTextContainer")
    editContent.value = JSON.parse(sessionStorage.savedNote).content

    //Edit Cancel
    let editCancel = document.getElementById("cancelButton")
    editCancel.addEventListener("click", function () { window.location = "note.html" })

    //Edit Save
    let editSave = document.getElementById("saveButton")
    editSave.addEventListener("click", function () {
        let noteSave = JSON.parse(sessionStorage.savedNote)
        let editedTitle = document.getElementById("editTitleContainer").value
        let editedContent = document.getElementById("editTextContainer").value
        noteSave.title = editedTitle
        noteSave.content = editedContent
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
        window.location = "note.html"
    })
}
