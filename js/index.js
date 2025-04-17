



const SELECT_PRODUTOS = document.getElementById("Select_produtos");
const INPUT_QUANTIDADE = document.getElementById("Input_quantidade");
const INPUT_PRECO = document.getElementById("Input_preco");
const TABLE_VENDAS = document.getElementById("tbody_vendas");
const CAIXA_COUNT = document.getElementById("Caixa_caunt");



function adicionarLinhaNaTabela(venda) {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
        <td>${venda.produto}</td>
        <td>${venda.quantidade}</td>
        <td>${venda.preco.toFixed(2)}</td>
    `;

    TABLE_VENDAS.appendChild(novaLinha);
}


function AddVenda(event){
    event.preventDefault();

    //cria as variaveis que armazenam os valores dos inputs

    const produto = SELECT_PRODUTOS.value
    const quantidade = parseInt(INPUT_QUANTIDADE.value)
    const preco = parseFloat(INPUT_PRECO.value)

   //cria um objeto com os valores dos inputs
    const novaVenda = {
        produto: produto,
        quantidade: quantidade,
        preco: preco
    }

    //cria uma variavel que recupera o valor do localStorage e transforma em um array, caso não exista, cria um array vazio
    let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    //adiciona o objeto criado acima no array

    vendas.push(novaVenda);

    localStorage.setItem("vendas", JSON.stringify(vendas));

    adicionarLinhaNaTabela(novaVenda);
    contarVendar();
    SELECT_PRODUTOS.value = "";
    INPUT_QUANTIDADE.value = "";
    INPUT_PRECO.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    const caixa = JSON.parse(localStorage.getItem("total")) || 0;
    CAIXA_COUNT.innerHTML = ` ${caixa.toFixed(2)}`;
    vendas.forEach(venda => adicionarLinhaNaTabela(venda));
});


function LimparCaixa(){
    

    if(!confirm("Tem certeza que deseja limpar o caixa?")) {
        return;
    }else{
        localStorage.removeItem("vendas");
        localStorage.removeItem("total");
        TABLE_VENDAS.innerHTML = "";
        CAIXA_COUNT.innerHTML = "0.00";
    }


}

function contarVendar(){
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    let total = 0;
    vendas.forEach(venda => {
        total += venda.preco 
    });

    CAIXA_COUNT.innerHTML = ` ${total.toFixed(2)}`;
    localStorage.setItem("total", total.toFixed(2));
}


fetch("http://localhost:3000/produtos")
    .then(response => response.json())
    .then(data => {
        data.forEach(produto => {
            const option = document.createElement("option");
            option.value = produto.nome;
            option.textContent = produto.nome;
            SELECT_PRODUTOS.appendChild(option);
        });
    })

function AdicionarProduto(){
    let produto = {
        nome: document.getElementById("Input_nome_produto").value
    }

    

    fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    

}




