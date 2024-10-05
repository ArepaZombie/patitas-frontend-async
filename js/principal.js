window.addEventListener('load',function(){

    //enviamos mensaje
    const msgSuccess = this.document.getElementById('mensaje');

    //obtenemos info en del localhost
    const result = JSON.parse(this.localStorage.getItem('result'));

    mostrarAlerta(result.nombreUsuario, msgSuccess)

})

function mostrarAlerta(mensaje, msgError){
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

function ocultarAlerta(msgError){
    msgError.innerHTML = '';
    msgError.style.display = 'none';
}