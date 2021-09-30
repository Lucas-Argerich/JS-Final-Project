//Sample Notes

const Notes = [{
    id: "nvz8v843y",
    title: "Mi primer Nota",
    content: "hola mundo! esta es mi primer nota.",
    created_at: "Fri Sep 10 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
    edited_at: "Wed Oct 13 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
    authorId: 0
},
{
    id: "zs1lcre3e",
    title: "Supermercado",
    content: "Comprar: Leche, Crema, Fideos, Tomates, Pan",
    created_at: "Tue Jul 21 2015 00:00:00 GMT-0300 (hora estándar de Argentina)",
    edited_at: "Mon May 10 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
    authorId: 1
},
{
    id: "6gei7eenv",
    title: "Cosas que hacer",
    content: "Tantas cosas por codear...",
    created_at: "Sat Jul 21 2018 00:00:00 GMT-0300 (hora estándar de Argentina)",
    edited_at: "Fri Sep 17 2021 00:00:00 GMT-0300 (hora estándar de Argentina)",
    authorId: 0
}
]
if (localStorage.getItem("Notes") == null) { 
    localStorage.setItem("Notes", JSON.stringify(Notes));
}
