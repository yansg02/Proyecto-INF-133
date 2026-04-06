const DESPLAZAMIENTO = 7;

export const encriptar = (texto) => {
    try {
        if (!texto) return '';
        
        let resultado = '';
        for (let i = 0; i < texto.length; i++) {
            let char = texto.charAt(i);
            let code = texto.charCodeAt(i);
            
            if (code >= 32 && code <= 126) {
                let nuevoCode = code + DESPLAZAMIENTO;
                
                if (nuevoCode > 126) {
                    nuevoCode = 32 + (nuevoCode - 127);
                }
                
                char = String.fromCharCode(nuevoCode);
            }
            
            resultado += char;
        }
        return resultado;
    } catch (error) {
        console.error('Error al encriptar:', error);
        return '';
    }
};

export const desencriptar = (textoCifrado) => {
    try {
        if (!textoCifrado) return '';
        
        let resultado = '';
        for (let i = 0; i < textoCifrado.length; i++) {
            let char = textoCifrado.charAt(i);
            let code = textoCifrado.charCodeAt(i);
            
            if (code >= 32 && code <= 126) {

                let nuevoCode = code - DESPLAZAMIENTO;
                
                if (nuevoCode < 32) {
                    nuevoCode = 127 - (32 - nuevoCode);
                }
                
                char = String.fromCharCode(nuevoCode);
            }
            
            resultado += char;
        }
        return resultado;
    } catch (error) {
        console.error('Error al desencriptar:', error);
        return '';
    }
};

export const encriptarDatosUsuario = (datosUsuario) => {
    try {
        const datosString = JSON.stringify(datosUsuario);
        return encriptar(datosString);
    } catch (error) {
        console.error('Error al encriptar datos de usuario:', error);
        return '';
    }
};

export const desencriptarDatosUsuario = (datosCifrados) => {
    try {
        if (!datosCifrados) return null;
        
        const datosString = desencriptar(datosCifrados);
        return JSON.parse(datosString);
    } catch (error) {
        console.error('Error al desencriptar datos de usuario:', error);
        return null;
    }
};

export const encriptarPasswordSimple = (password) => {
    return encriptar(password);
};

export const verificarPasswordSimple = (password, passwordCifrado) => {
    return encriptar(password) === passwordCifrado;
};