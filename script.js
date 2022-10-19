//Pegar banco
const getLocalStorage = () => JSON.parse(localStorage.getItem('id')) ?? [];
//enviar banco
const setLocalStorage =(banco)=> localStorage.setItem('id',JSON.stringify(banco));
//criar banco
const createClient = (client) =>{
    let banco = getLocalStorage();
    banco.push(client)
    setLocalStorage(banco);
}
//Ler banco
const readClient= () => getLocalStorage();

//edit client
const updateClient = (index,client)=>{
    let banco = readClient();
    banco[index]= client;
    setLocalStorage(banco);
}
//deletClient
const deletClient= (index)=>{
    let banco = readClient();
    banco.splice(index,1);
    setLocalStorage(banco);
}
//addList

const addList = (obj,index)=>{
    
    let itemList = document.createElement("tr");
    itemList.innerHTML = 
    `
    <td>${obj.nome}</td>
    <td>R$${obj.wage}</td>
    <td data-index ="${index}"}>
        <div class="buttonEdit" onclick="showModal()">Editar</div>
        <div class="buttonDelet">Deletar</div>
    </td>    
    `
    document.getElementById("lista").append(itemList);
}


//render list

const renderList = ()=>{
    document.getElementById("lista").innerHTML = "";
    let banco = readClient();
    banco.forEach(addList)
}

//limpar inputs
 const clearInputs = ()=>{
    document.getElementById("name").value = '';
    document.getElementById("wage").value = '';
}

const validate = ()=>{
    return document.getElementById("form").reportValidity();
}
//criando obj client
const createObj = ()=>{
    if(validate()){
        let nome = document.getElementById("name").value;
        let wg = document.getElementById("wage").value;
    
        let obj = {
            nome:nome,
            wage:wg
        }
        let banco = readClient();
        banco.push(obj);
        setLocalStorage(banco);
        renderList();
        clearInputs();
    }
}
//edit delet
const editDelet = (e) => {

    if(e.target.innerHTML == "Deletar"){
        const index = e.target.parentNode.dataset.index;
        deletClient(index);
        renderList();
        
    }else if(e.target.innerHTML == "Editar") {
        
        const index = e.target.parentNode.dataset.index;
        const banco = readClient();
        const client = banco[index];
        document.querySelector("#nameE").value = client.nome;
        document.querySelector("#wageE").value = client.wage;
        const Editar = () =>{
            client.nome = document.querySelector("#nameE").value;
            client.wage = document.querySelector("#wageE").value;
            console.log(client);
            banco[index] = client;
            setLocalStorage(banco);
            renderList();
        }
        document.getElementById("save").addEventListener("click",Editar) 
    }
}


document.getElementById("add").addEventListener("click",createObj);
document.querySelector("#table>tbody").addEventListener("click",editDelet);


renderList();