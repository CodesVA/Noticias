document.getElementById('botones').addEventListener('click', delegacion);
document.getElementById('buscar').addEventListener('click', buscador);

function delegacion(e) {
    e.preventDefault();
    let botonPresionado = e.target;
    if (botonPresionado.classList[0] == 'btn') {
        temaActual = botonPresionado.innerHTML.toLowerCase();
        pageFinal = cantidadNoticias;
        buscar(temaActual);
    }
}

function buscar(tema) {
    traerNoticias.fetchNoticias(tema);
}

function buscador() {
    temaActual= document.getElementById('busqueda').value;
    pageFinal = cantidadNoticias;
    buscar(temaActual);
}

//cantidad de noticias que se cargaran cada vez que se presione siguiente

let cantidadNoticias = 6; //se mostraran 6
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = 'tecnologia';

//cosumir api con llave
let traerNoticias = {
    "apiKey": "7fd5a21f809f4a4a87dd9437a3746579",
    fetchNoticias: function (categoria) {
        fetch(
            "https://newsapi.org/v2/everything?q=" +
            categoria +
            "&languaje=es&apiKey=" + this.apiKey
        )
            .then(response => response.json())
            .then(data => {
                subirNoticias(data);
            })
    }
}

function subirNoticias(data) {
    let contenedor = document.getElementById('container-noticias');
    contenedor.innerHTML = "";

    for (let i = pageInicial; i < pageFinal; i++) {
        if (data.articles[i].urlToImage !== null && data.articles[i].urlToImage!=="https://g.twimg.com/Twitter_logo_blue.png") {
            //console.log(data.articles[i]); //use la consola para ver por que algunas imagenes no se veian
            let cardDiseno = `
                <div class="col-12 col-sm-6 col-lg-4 p-3">
                    <article class="card h-100">
                        <div class="card-body">
                            <a href="${data.articles[i].url}" class="h3 card-title lh-1 fw-semibold text-decoration-none">
                            ${data.articles[i].title}
                            </a>
                        </div>
                        <img src="${data.articles[i].urlToImage}" class="card-img-top" alt="..." style="height: 13rem;">
                        <div class="d-flex justify-content-between">
                            <p class="mx-1">${data.articles[i].publishedAt.substring(0, 10)}</p>
                            <p class="mx-1">${data.articles[i].source.name}</p>
                        </div>
                    </article>
                </div>
            `;
            contenedor.innerHTML += cardDiseno;
        }

        if (data.articles[i].urlToImage== null || data.articles[i].urlToImage=="https://g.twimg.com/Twitter_logo_blue.png") {
            pageFinal++;
        }
    }
}

(() => {
    buscar(temaActual);
})()

document.getElementById('verMas').onclick = function () {
    pageFinal += cantidadNoticias;
    buscar(temaActual);
}