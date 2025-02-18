// Obtener los elementos del DOM
let input = document.getElementById("input");
let output = document.getElementById("output");
let encodeButton = document.getElementById("encode");
let decodeButton = document.getElementById("decode");
let copyButton = document.getElementById("copy");
let pasteButton = document.getElementById("paste");

// Crear un codificador y un decodificador de texto
let encoder = new TextEncoder();
let decoder = new TextDecoder();

// Añadir eventos a los botones
encodeButton.addEventListener("click", function () {
    // Codificar el texto de entrada como una secuencia de bytes UTF-8
    let bytes = encoder.encode(input.value);
    // Mostrar los bytes como una cadena hexadecimal
    output.value = bytesToHex(bytes);
});

decodeButton.addEventListener("click", function () {
    // Convertir la cadena hexadecimal de entrada en una secuencia de bytes
    let bytes = hexToBytes(input.value);
    // Decodificar los bytes como una cadena UTF-8
    output.value = decoder.decode(bytes);
});

copyButton.addEventListener("click", function () {
    // Copiar el contenido del campo de salida al portapapeles
    output.select();
    document.execCommand("copy");
    // Limpiar el campo de entrada
    input.value = "";
});

pasteButton.addEventListener("click", async function () {
    // Pegar el contenido del portapapeles en el campo de entrada
    try {
        const text = await navigator.clipboard.readText();
        input.value = text;
    } catch (err) {
        console.error("Error al pegar:", err);
    }
});

// Función auxiliar para convertir una secuencia de bytes en una cadena hexadecimal
function bytesToHex(bytes) {
    return Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Función auxiliar para convertir una cadena hexadecimal en una secuencia de bytes
function hexToBytes(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(h => parseInt(h, 16)));
}