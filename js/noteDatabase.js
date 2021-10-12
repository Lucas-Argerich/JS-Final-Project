//Sample Notes

const Notes = [
]
if (localStorage.getItem("Notes") == null) { 
    localStorage.setItem("Notes", JSON.stringify(Notes));
}
