//Seleciona os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona o elemento da lista de despesas.
const expenseList = document.querySelector("ul")

//Adiciona um evento de input para formatar o valor.
amount.oninput = () => {
    //Obtém o valor atual do input e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    //Transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$1,50)
    value = Number(value) / 100
    //Atualiza o valor do input sem letras
    amount.value = formatCurrencyBRL(value)
}


function formatCurrencyBRL(value){
    // Formata o valor no padrão BRL (Real brasileiro)
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    //Retorna o valor formatado
    return value
}

//Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    //Previne o comportamento padrão de recarregar a página
     event.preventDefault()
    
     //Cria um objeto com os detalhes na nova despesa.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //Chama a função que irá adicionar o item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense){
    try {
        //Cria o elemento para adicionar o item (li) na lista (ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //Cria o ícone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", `Ícone de tipo da despesa ${newExpense.category_name}`)

        //Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name
        
        /* ----------------------------------------------------------------------
        Daqui para baixo definimos a hierarquia do DOM -estrutura de elementos pai e filho.
        // Estrutura final desejada:
            expenseList
             └── expenseItem
                   ├── expenseIcon
                   └── expenseInfo
                         ├── expenseName
                         └── expenseCategory
        A ordem da arvore tem que ser inversa, porque o último elemento adicionado
        será o primeiro a ser renderizado na tela.
        -------------------------------------------------------------------------*/
        //Adiciona nome e catogoria na div como filhos da div de informações
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o item de despesa juntando o ícone (filho 1) e as informações (filho 2)
        expenseItem.append(expenseIcon, expenseInfo)
        
        // Coloca o item de despesa completo dentro da lista principal (pai)
        expenseList.append(expenseItem)
        

    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
    }
}