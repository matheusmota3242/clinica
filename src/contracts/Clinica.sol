pragma solidity ^0.5.0;

contract Clinica {
    string public nome;
    uint public contConsultas = 0;
    mapping(uint => Consulta) public consultas;

    struct Consulta {
        uint id;
        address enderecoPaciente;
        address enderecoMedico;
        uint preco;
        bool prescricaoExistente;
        bool confirmada;
    }

    event ConsultaMarcada(
        uint id,
        address enderecoPaciente,
        address enderecoMedico,
        uint preco,
        bool prescricaoExistente,
        bool confirmada
    );

    event ConsultaConfirmada(
        uint id,
        address enderecoPaciente,
        bool confirmada
    );

    constructor() public {
        nome = "Clinica da Saude";
    }

    function marcarConsulta(address _enderecoMedico, uint _preco) public {
        // Garantir a integridade dos parametros
        // Incrementa contador
        contConsultas++;
        consultas[contConsultas] = Consulta(contConsultas, msg.sender, _enderecoMedico, _preco, false, false);
        // Marcar consulta
        // Trigger an event}
        emit ConsultaMarcada(contConsultas, msg.sender, _enderecoMedico, _preco, false, false);
    }

    function confirmarConsulta(uint _id) public {
        // Garantir a integridade dos parametros
        // Carregar consulta
        Consulta memory _consulta = consultas[_id];
        require(msg.sender == _consulta.enderecoPaciente, "Permissao negada");
        require(_id == _consulta.id, "Dados invalidos");
        // Confirmar consulta
        _consulta.confirmada = true;

        consultas[_id] = _consulta;
        emit ConsultaConfirmada(_id, msg.sender, _consulta.confirmada);

    }
}