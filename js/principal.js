window.addEventListener('load',function(){

    //enviamos mensaje
    const msgSuccess = this.document.getElementById('mensaje');

    //obtenemos info en del localhost
    const result = JSON.parse(this.localStorage.getItem('result'));
    const numeroDocumento = this.localStorage.getItem('numerodocumento');
    const tipoDocumento = this.localStorage.getItem('tipodocumento');

    mostrarAlerta(result.nombreUsuario, msgSuccess)
    const btnCerrar = this.document.getElementById('btnCerrarSesion');
    const btnCerrarEF = this.document.getElementById('btnCerrarSesionEF');

    btnCerrar.addEventListener('click', function(){
        //console.log(result);
        cerrarSesion(result.correoUsuario, msgSuccess)
    })

    btnCerrarEF.addEventListener('click', function(){
        //console.log(result);
        cerrarSesionEF(numeroDocumento, tipoDocumento, msgSuccess)
    })
})

function mostrarAlerta(mensaje, msg){
    msg.innerHTML = mensaje;
    msg.style.display = 'block';
}

function ocultarAlerta(msg){
    msg.innerHTML = '';
    msg.style.display = 'none';
}

async function cerrarSesion(email, msg){
    mostrarAlerta("Cerrando sesión...",msg)
    const url = 'http://localhost:8082/login/close-async';
    const data = {
        email:email
    };
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            mostrarAlerta('Error! Problema al cerrar sesion');
            throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json();
        console.log('Respuesta del server', result);

        if(result.codigo == '00'){
            localStorage.removeItem('result');
            localStorage.removeItem('tipodocumento');
            localStorage.removeItem('numerodocumento');
            window.location.replace('index.html');
        } else {
            mostrarAlerta(result.mensaje, msg);
        }

    }catch (error) {
        console.error('Error: Problema en el servicio', error)
        mostrarAlerta('Error: Problema en el servicio', msg)
    }


}

async function cerrarSesionEF(tipoDocumento, numeroDocumento, msg) {
    mostrarAlerta("Cerrando sesión...",msg)
    const url = 'http://localhost:8082/login/close-ef';
    const data = {
        tipoDocumento:tipoDocumento,
        numeroDocumento:numeroDocumento
    };
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            mostrarAlerta('Error! Problema al cerrar sesion');
            throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json();
        console.log('Respuesta del server', result);

        if(result.codigo == '00'){
            localStorage.removeItem('result');
            localStorage.removeItem('tipodocumento');
            localStorage.removeItem('numerodocumento');
            window.location.replace('index.html');
        } else {
            console.error('Error: Problema en el servidor')
            mostrarAlerta("Error: Problema en el serivdor", msg);
        }

    }catch (error) {
        console.error('Error: Problema en el servicio', error)
        mostrarAlerta('Error: Problema en el servicio', msg)
    }

}