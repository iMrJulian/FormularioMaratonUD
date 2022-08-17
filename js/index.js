import {guardarGrupo, obtenerGrupos, subirArchivo, obtenerGruposAvanzada, obtenerGruposElite, subirArchivoCorreos} from '../BaseDatos/firebase.js'
import { teamsToTsv, accountsToTsv, correosToTsv} from './arrayToTsv.js';

const formulario = document.getElementById("formulario");
const nIntegrantes = document.getElementById('Integrantes');
const registroCompleto = document.getElementById('registroCompletado');


window.addEventListener('DOMContentLoaded', async () => {

    //const avanzada = await obtenerGruposAvanzada()
    //const elite = await obtenerGruposElite()

    // elite.forEach(doc => {
    //     const grupo = doc.data();
    //     console.log(grupo)
    // });

    //const quarySnapshot1 = await obtenerGrupos();
    //guardarArchivosTsv(quarySnapshot1);

    // console.log(quarySnapshot);

    // quarySnapshot.forEach(doc =>{
    //     console.log(doc.data());
    // });
});

nIntegrantes.addEventListener("change", (e) => {
    const cantidad = e.target.value;
});

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombreEquipo = formulario['name'].value.replace(/ /g, "");
    const catText= formulario['Categoria'].value;
    const catNumero = formatCategoria(catText);
    const nIntegrantes = formulario['Integrantes'].value;
    const e1Nombre = formulario['estudiante1Nombre'].value;
    const e1Apellido = formulario['estudiante1Apellido'].value;
    const e1Email = formulario['estudiante1Email'].value;
    const e1Codigo = formulario['estudiante1Codigo'].value;
    const e2Nombre = formulario['estudiante2Nombre'].value;
    const e2Apellido = formulario['estudiante2Apellido'].value;
    const e2Email = formulario['estudiante2Email'].value;
    const e2Codigo = formulario['estudiante2Codigo'].value;
    const e3Nombre = formulario['estudiante3Nombre'].value;
    const e3Apellido = formulario['estudiante3Apellido'].value;
    const e3Email = formulario['estudiante3Email'].value;
    const e3Codigo = formulario['estudiante3Codigo'].value;

    const clave = claveAleatoria();
    

    if(catText!="Categoria" && nIntegrantes!="Integrantes"){
        if(nIntegrantes == 2 || (e3Nombre != "" && e3Apellido != "" && e3Email != "" && e3Codigo != "")){
            
            formulario.style.display = "none";

            const quarySnapshot = await obtenerGrupos();
            const id = quarySnapshot.size+1;
            
            const usuario = await guardarGrupo(id, nombreEquipo, clave, catText, catNumero, nIntegrantes,
                e1Nombre, e1Apellido, e1Email, e1Codigo,
                e2Nombre, e2Apellido, e2Email, e2Codigo,
                e3Nombre, e3Apellido, e3Email, e3Codigo);
            
            const quarySnapshot1 = await obtenerGrupos();
            guardarArchivosTsv(quarySnapshot1);
            completarRegistro(usuario, clave);
                
        } else if (nIntegrantes == 3){
            alert("Llene los datos del estudiante 3");
        }
    } else if(catText=="Categoria"){
        alert("Ingrese la categoria a participar");
    } else {
        alert("Ingrese la cantidad de integrantes a participar");
    }
});

const claveAleatoria = () => {
    const max = 99999;
    const numero = Math.floor(Math.random() * max);
    if(numero>9999){
        return ""+numero;
    } else if(numero > 999){
        return "0"+numero;
    } else {
        return "00"+numero;
    }
}

const formatCategoria = (categoria) => {
    switch(categoria){
        case "Basica":
            return 6;
            break;
        case "Intermedia":
            return 7;
            break;
        case "Avanzada":
            return 8;
            break;
        case "Elite":
            return 9;
            break;
        default:
            return categoria;
    }
}

const completarRegistro = (nombreEquipo, clave) =>{
    const htmlUsuarioFinal = `
    <p>Recuerde que para poder participar en la maraton son necesarios estos datos
    asi que es necesario guardarlos.
    </p>
        <div class = "datosFinales">
            <p>Usuario:  ${nombreEquipo}</p>
            <p>Contraseña: ${clave}</p>
        </div>
    `;

    registroCompleto.innerHTML = htmlUsuarioFinal;
    registroCompleto.style.display = "block";
};

const guardarArchivosTsv = (grupos) => {
    const archivoTeams = teamsToTsv(grupos);
    const archivoAccounts = accountsToTsv(grupos);
    const correos = correosToTsv(grupos);
    subirArchivo(archivoTeams, archivoAccounts);
    subirArchivoCorreos(correos);
}