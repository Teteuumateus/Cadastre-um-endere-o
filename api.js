let dadosApi;

const cep = document.querySelector("#cep")
const estado = document.querySelector("#uf")
const cidade = document.querySelector("#cidade")
const complemento = document.querySelector("#comp")
const bairro = document.querySelector("#bairro")
const rodopiao = document.querySelector(".loader")
const rua = document.querySelector("#rua")

const todoForm = [cep, rua, estado, bairro, cidade, complemento];


function buscaCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
.then(resposta => {
    console.log(resposta)
    rodopiao.style.display = "block"
    desabilitarForms()
    return resposta.json()
    

}).then(dados => {
    dadosApi = dados;
    setTimeout(() => {
    preencherForms(dadosApi)
    rodopiao.style.display = "none" 
    habilitarForms()
}, 3000)
;
});
}

function preencherForms (dadosApi) {
    rua.value = dadosApi.logradouro;
    estado.value = dadosApi.uf;
    bairro.value = dadosApi.bairro;
    cidade.value = dadosApi.localidade;
    complemento.value = dadosApi.complemento;
}

function desabilitarForms() {
    for (const input of todoForm) {
        input.disabled = true;
    }
}

function habilitarForms() {
    for (const input of todoForm) {
        input.disabled = false;
    }
}

cep.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        alert("Vamos buscar o cep...")
        buscaCep(cep.value)
    }
})