



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
        <td>${venda.preco}</td>
    `;

    TABLE_VENDAS.appendChild(novaLinha);
}


function AddVenda(event){
    event.preventDefault();

    const produto = SELECT_PRODUTOS.value
    const quantidade = parseInt(INPUT_QUANTIDADE.value)
    const preco = parseFloat(INPUT_PRECO.value)


    const novaVenda = {
        produto: produto,
        quantidade: quantidade,
        preco: preco
    }
    let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

    vendas.push(novaVenda);

    localStorage.setItem("vendas", JSON.stringify(vendas));

    adicionarLinhaNaTabela(novaVenda);
    SELECT_PRODUTOS.value = "";
    INPUT_QUANTIDADE.value = "";
    INPUT_PRECO.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    const vendas = JSON.parse(localStorage.getItem("vendas")) || [];
    vendas.forEach(venda => adicionarLinhaNaTabela(venda));
});


function LimparCaixa(){
    

    if(!confirm("Tem certeza que deseja limpar o caixa?")) {
        return;
    }else{
        localStorage.removeItem("vendas");
        TABLE_VENDAS.innerHTML = "";
    }


}


