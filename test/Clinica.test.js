// Testes utilizando as libs Moccha e Chai
const Clinica = artifacts.require('./Clinica.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Clinica', ([deployer, medico, paciente]) => {
    let clinica

    before(async () => {
        clinica = await Clinica.deployed()
    })

    describe('deployment', async () => {
        it('fez deploy com sucesso', async () => {
            const endereco = await clinica.address
            assert.notEqual(endereco, 0x0)
            assert.notEqual(endereco, null)
            assert.notEqual(endereco, undefined)
            assert.notEqual(endereco, '')
        })

        it('nome presente', async () => {
            const nome = await clinica.nome()
            assert.equal(nome, 'Clinica da Saude')
        })
    })

    describe('consulta marcada', async () => {
        let resultado, contConsultas

        before(async () => {
            resultado = await clinica.marcarConsulta(medico, web3.utils.toWei('1', 'Ether'), {from: paciente})
            contConsultas = await clinica.contConsultas()
        })
        
        it('marca consulta', async () => {
            // SUCESSO
            assert.equal(contConsultas, 1)
            const event = resultado.logs[0].args
            assert.equal(event.id.toNumber(), contConsultas.toNumber(), 'id correto')
            assert.equal(event.preco, '1000000000000000000', 'preco correto')
            assert.equal(event.enderecoPaciente, paciente, 'endereco do requerente bate com o do paciente')
            assert.equal(event.enderecoMedico, medico, 'endereco do medico passado bate com o do medico em blockchain')
            assert.equal(event.prescricaoExistente, false, 'sem prescricao, conforme esperado')
            assert.equal(event.confirmada, false, 'sem confirmacao, conforme esperado')
        
            // ERRO: Paciente precisa pôr seu nome
            //await await clinica.marcarConsulta('Dr. Joao da Silva', '', web3.utils.toWei('1', 'Ether'), {from: paciente}).should.be.rejected;
            // ERRO: Paciente precisa pôr nome do medico
            //await await clinica.marcarConsulta('', 'Inacio de Loyola', web3.utils.toWei('1', 'Ether'), {from: paciente}).should.be.rejected;
            //await await clinica.marcarConsulta('Dr. Joao da Silva', 'Inacio de Loyola', 0, {from: paciente}).should.be.rejected;

        })

        it('lista consultas', async () => {
            const consulta = await clinica.consultas(contConsultas)
            assert.equal(consulta.id.toNumber(), contConsultas.toNumber(), 'id correto')
            assert.equal(consulta.preco, '1000000000000000000', 'preco correto')
            assert.equal(consulta.enderecoPaciente, paciente, 'endereco do requerente bate com o do paciente')
            assert.equal(consulta.enderecoMedico, medico, 'endereco do medico passado bate com o do medico em blockchain')
            assert.equal(consulta.prescricaoExistente, false, 'sem prescricao, conforme esperado')
            assert.equal(consulta.confirmada, false, 'sem confirmacao, conforme esperado')
        })
    })

    describe('consulta confirmada', async () => {
        let resultado, contConsultas
            
        before(async () => {
            contConsultas = await clinica.contConsultas()
            resultado = await clinica.confirmarConsulta(contConsultas, {from: paciente})
        })
        it('paciente confirma consulta', async () => {
            
            const consulta = await clinica.consultas(contConsultas)
            /* assert.equal(consulta.id.toNumber(), contConsultas.toNumber(), 'id correto')
            assert.equal(consulta.preco, '1000000000000000000', 'preco correto')
            assert.equal(consulta.enderecoPaciente, paciente, 'endereco do requerente bate com o do paciente')
            assert.equal(consulta.enderecoMedico, medico, 'endereco do medico passado bate com o do medico em blockchain')
            assert.equal(consulta.prescricaoExistente, false, 'sem prescricao, conforme esperado')
            assert.equal(consulta.confirmada, true, 'consulta confirmada, conforme esperado') */
        })
    })

})