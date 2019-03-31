
// Pegar o tipo de conversão (pelo select). EX: Decimal - Binário
document.querySelector('#field-value').addEventListener('input', e=>{
    if(!document.querySelector('#field-value').value == '') {
        toConvert()
    } else {
        setLabelValue('0')
    }
})

document.querySelector('select').addEventListener('change', event=>{
    let type= document.querySelector('option:checked').text
    setLabelTitleAndResult(type)
})


toConvert =() => {

    let select = document.querySelector('select')
    let selectedIndex = select.options[select.selectedIndex].text.toUpperCase()

    const d_b = 'DECIMAL - BINÁRIO'
    const b_d = 'BINÁRIO - DECIMAL'
    const d_h = 'DECIMAL - HEXADECIMAL'
    const h_d = 'HEXADECIMAL - DECIMAL'

    let result = 0;

    try {

        switch (selectedIndex) {

            // decimal - binario
            case d_b:
                result = decimalToBinary(getInputValue())
                setLabelValue(result)
                break;

            // binario - decimal
            case b_d:
                result = binaryToDecimal(getInputValue())
                setLabelValue(result)
                break;

            // decimal hexadecimal
            case d_h:
                result = decimalToHexadecimal(getInputValue())
                setLabelValue(result)  
                break;

            // hexadecimal - decimal
            case h_d: 
                result = hexadecimalToDecimal(getInputValue())
                setLabelValue(result)
                break;

            default:
                break;
        }
    } catch (e){
        setLabelValue(e)
    }
}

// 
function getInputValue(){
    return document.querySelector('#field-value').value
}

function setLabelValue(value){
    let textLabel = document.querySelector('#label-result-value')
    textLabel.innerHTML = value
}

setLabelTitleAndResult =(type)=> {
    let labelValue = document.querySelector('#label-value')
    let labelResult = document.querySelector('#label-result')

    // const d_b = 'DECIMAL - BINÁRIO'
    let arrayType = type.split('-')
    let from = arrayType[0]
    let to = arrayType[1]

    from = from.substring(0,from.length-1)
    to = to.substring(1)

    labelValue.innerHTML = from
    labelResult.innerHTML = to
}

// funções para converter

// ================ DECIMAL E BINÁRIO ================ 
decimalToBinary = (value) => {
    if(isNumber(value)){
        let binary = parseInt(value).toString(2)
        return binary
    }
    throw 'Error'
}

binaryToDecimal=(value)=>{
    if(isBinary(value)){
        let decimal = parseInt(value, 2)
        return decimal
    }
    throw 'Error'
}

// ================ DECIMAL E HEXADECIMAL ================ 
function decimalToHexadecimal(value){
    if(isNumber(value)){
        console.log(value+'<>' + isNumber(value))
        let hexadecimal = parseInt(value).toString(16)
        return hexadecimal

    }
    throw 'Error'
}

function hexadecimalToDecimal(value){
    
    if(isHexadecimal(value)){
        let decimal = parseInt(value, 16)
        return decimal 
    }
    throw 'Error'
}

// ================ DECIMAL E OCTAL ================ 

function isNumber(value){
    return !isNaN(value)
}

function isHexadecimal(value){
    let hexadecimal = value
    let letters = ['a','b','c', 'd', 'e', 'f']
    for (let x = 0; x < hexadecimal.length; x++) {
        for(let j=0; j < letters.length; j++) {
            if (hexadecimal[x].toUpperCase() === letters[j].toUpperCase()){
                return true          
            }
        }
    }

    return false
}

function isBinary (value){
    let binary = value
    let letters = ['a','b','c', 'd', 'e', 'f']

    if(isNaN(value)){
        return false
    }

    for (let i = 0; i< value.length; i++){
        if (value[i] < 0 || value[i] > 1){
            return false
        }
    }

    for (let x = 0; x < binary.length; x++) {
        for(let j=0; j < letters.length; j++) {
            if (binary[x].toUpperCase() === letters[j].toUpperCase()){
                return false        
            }
        }
    }

    return true
}

function isEmpty(){
    return (getInputValue() === '')
}