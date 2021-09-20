//Aside

const userNotes = Notes.filter(note => note.authorId == JSON.parse(localStorage.user).id)
for (const note of userNotes) {
    let link = document.createElement('a')
    link.className = "asideNoteInline"
    link.innerHTML = `<h3 class="asideNoteTitle"> ${note.title} </h3><h3 class="asideNoteDate"> ${note.created_at.slice([5])} </h3>`
    
    let parent = document.getElementById("noteList")
    parent.appendChild(link)
}   

function logOff() {
    localStorage.user = "";
    window.location.href = "./"
}

//Main

