'use strict'

// fetch -  pega uma url e faz uma requisicao.

const pesquisarCep = async (cep) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const data = await response.json()
    return data
} 

const cepValido = (cep) => /^[0-9]{8}$/.test(cep)

const limparCampos = () => {
    document.querySelector('#endereco').value = ''
    document.querySelector('#bairro').value = ''
    document.querySelector('#cidade').value = ''
    document.querySelector('#estado').value = ''
}

const preencherFormulario = async (evento) => {
    const cep = evento.target.value
    limparCampos()

    if(cep === '') return 0

    if(cepValido(cep)){
        const infoCep = await pesquisarCep(cep)

        if(infoCep.erro){
            document.querySelector('#endereco').value = 'CEP não encontrado!'
        }else{
            document.querySelector('#endereco').value = infoCep.logradouro
            document.querySelector('#bairro').value = infoCep.bairro
            document.querySelector('#cidade').value = infoCep.localidade
            document.querySelector('#estado').value = infoCep.uf
        }
    }else{
        document.querySelector('#endereco').value = 'CEP incorreto!'
    }
    
}

document.querySelector('#cep').addEventListener('focusout', preencherFormulario)