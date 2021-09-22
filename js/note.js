//Aside

const userNotes = Notes.filter(note => note.authorId == JSON.parse(localStorage.user).id)
for (const note of userNotes) {
    let link = document.createElement('a')
    link.className = "asideNoteInline"
    link.id = note.id
    link.innerHTML = `<h3 class="asideNoteTitle"> ${note.title} </h3><h3 class="asideNoteDate"> ${note.created_at.slice([5])} </h3>`

    let parent = document.getElementById("noteList")
    parent.appendChild(link)
}

noteListLength = document.getElementById("noteList").getElementsByTagName("a").length
for (let i = 0; i < noteListLength; i++) {
    document.getElementsByClassName("asideNoteInline")[i].addEventListener("click", saveNote)
}

function saveNote() {
    const noteSearchById = Notes.find(
        a => a.id == this.id
    );
    sessionStorage.setItem('savedNote', JSON.stringify(noteSearchById))
    location.reload();
}


function logOff() {
    localStorage.removeItem("user")
    window.location.href = "./"
}


//Note Loader

//Head Title
let title = document.createElement("title")
title.innerText = `${JSON.parse(sessionStorage.savedNote).title} | My Notes`
document.head.appendChild(title)

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
creationDate.innerText = JSON.parse(sessionStorage.savedNote).created_at
document.getElementById("creationDateDiv").prepend(creationDate)

//Last Edit Date
let lastEditDate = document.createElement("span")
lastEditDate.className = "bigDate"
lastEditDate.innerText = JSON.parse(sessionStorage.savedNote).edited_at
document.getElementById("lastChangeDiv").prepend(lastEditDate)

//Today's bigDate
let todaysDate = document.createElement("span")
todaysDate.className = "bigDate"
todaysDate.innerText = `${new Date().getDate()}/${new Date().getMonth() + 1} `
document.getElementById("todaysDateDiv").prepend(todaysDate)
