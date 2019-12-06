// Testes utilizando as libs Moccha e Chai
const Prescritor = artifacts.require('./Prescritor.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Prescritor', ([
    deployer, paciente1, paciente2, paciente3, paciente4, medico1, medico2, medico3, farmacia1, farmacia2
]) => {
    let prescritor

    before(async () => {
        prescritor = await Prescritor.deployed()
    })

    describe('deployment', async () => {
        it('deploy com sucesso', async () => {
            const endereco = await prescritor.address
            assert.notEqual(endereco, 0x0)
            assert.notEqual(endereco, '')
            assert.notEqual(endereco, null)
            assert.notEqual(endereco, undefined)
        })

        it('get nome com sucesso', async () => {
            const nome = await prescritor.nome()
            assert.equal(nome, 'Contrato de Prescrições')
        })
    })

    describe('receitas', async () => {
        let resultado, contReceitas

        before(async () => {
            resultado = await prescritor.gerarReceita(paciente1, "Lexapro", 150, "mg", {from: medico1})
            contReceitas = await prescritor.contReceitas()
        })

        it('gera receita', async () => {
            assert.equal(contReceitas, 1)
            const event = resultado.logs[0].args
            console.log("Medico: ", event.medico)
            console.log("Paciente: ", event.paciente)
            console.log("Prescricao: ", event.medicamento + " " + event.dosagem.toNumber() + event.medida)
            console.log("Codigo: ", event.codigo.toNumber())
        })

        it('valida receita', async () => {
            resultado = await prescritor.validarReceita(contReceitas, {from: farmacia1})
        })
    })
})