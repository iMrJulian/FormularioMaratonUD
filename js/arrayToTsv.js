export const teamsToTsv = (grupo) => {
    var texto = "teams\t1\n";

    grupo.forEach(doc => {
        const grupo = doc.data();
        texto += `${grupo._id}\t\t${grupo.categoriaNumero}\t${grupo.nombre}\t${'Universidad Distrital Francisco José de Caldas'}\t${'UD'}\t${'COL'}\n`;
    });
    
    const archivo = new Blob([texto], { type: '"application/octet-stream"' });
    return archivo;
};  

export const accountsToTsv = (grupo) => {
    var texto = "accounts\t1\n";

    grupo.forEach(doc => {
        const grupo = doc.data();
        texto += `team\t${grupo.usuario}\t${grupo._id}\t${grupo.clave}\t${grupo._id}\n`;
    });

    const archivo = new Blob([texto], { type: '"application/octet-stream"' });
    return archivo;
};

export const correosToTsv = (grupo) => {

    var texto = "";

    grupo.forEach(doc => {
        const grupo = doc.data();
        texto += `${grupo.e1Email},${grupo.e2Email},${grupo.e3Email}\t${grupo.usuario}\t${grupo.clave}\n`;
    });

    const archivo = new Blob([texto], { type: '"application/octet-stream"' });
    return archivo;
    
};