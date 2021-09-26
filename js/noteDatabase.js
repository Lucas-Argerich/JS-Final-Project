//Sample Notes

const Notes = [{
    id: "nvz8v843y",
    title: "Mi primer Nota",
    content: "hola mundo! esta es mi primer nota.",
    created_at: "10/08/2021",
    edited_at: "13/09/2021",
    authorId: 0
},
{
    id: "zs1lcre3e",
    title: "Supermercado",
    content: "Comprar: Leche, Crema, Fideos, Tomates, Pan",
    created_at: "21/06/2015",
    edited_at: "10/04/2021",
    authorId: 1
},
{
    id: "6gei7eenv",
    title: "Cosas que hacer",
    content: "Tantas cosas por codear...",
    created_at: "21/06/2018",
    edited_at: "17/08/2021",
    authorId: 0
}
]
if (localStorage.getItem("Notes") == null) { 
    localStorage.setItem("Notes", JSON.stringify(Notes));
}
