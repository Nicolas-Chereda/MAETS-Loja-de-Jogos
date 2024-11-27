function validar(){
    var nome = form.nome.value;
    var email = form.email.value;
    var nota = form.nota.value; 

    if(nome == ""){
        alert("Por favor, digite seu nome.");
        form.nome.focus();
        return false;
    }

    if(email == ""){
        alert("Por favor, digite seu email.");
        form.email.focus();
        return false;
    }

    if(!email.includes("@")){
        alert("O email precisa conter '@'");
        form.email.focus();
        return false;
    }

    if(nota == 0){
        alert("Por favor, avalie nosso site");
        form.nota.focus();
        return false;
    }

    form.reset;
    alert("Agradecemos sua avaliação 😊");

}