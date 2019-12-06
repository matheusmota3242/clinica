pragma solidity ^0.5.0;

contract Prescritor {
    string public nome;
    uint public contReceitas = 0;
    uint digitosCodigo = 16;
    uint moduloCodigo = 10 ** 16;
    mapping(uint => Receita) public receitas;
    address[3] medicos = [
        0xdc962C3b60d18C67D533Ae9Aac1D998Ba85c8BD8,
        0x8c7f1A4A79e4c71FaF3cc1f19f4Aa7a978316623,
        0x55c6dB08E43B3696A44d0414503313555DC4D2bA
    ];

    address[2] farmacias = [
        0x7465BF48659B1763d388F93f3c58b3998E9f0C95,
        0x37Ef8448CF8fFBB7be7c70C51d01a682065A3973
    ];

    modifier apenasMedico {
        require(
            msg.sender == medicos[0] ||
            msg.sender == medicos[1] ||
            msg.sender == medicos[2],
            "Permissao negada!");
        _;
    }

    modifier apenasFarmacia {
        require(
            msg.sender == farmacias[0] ||
            msg.sender == farmacias[1],
            "Permissao negada!");
        _;
    }

    struct Receita {
        uint id;
        uint codigo;
        address payable medico;
        address paciente;
        string medicamento;
        uint dosagem;
        string medida;
        bool utilizada;
    }

    event ReceitaGerada(
        uint id,
        uint codigo,
        address payable medico,
        address paciente,
        string medicamento,
        uint dosagem,
        string medida,
        bool utilizada
    );

    event ReceitaValidada(
        uint id,
        uint codigo,
        address payable medico,
        address paciente,
        string medicamento,
        uint dosagem,
        string medida,
        bool utilizada
    );

    constructor() public {
        nome = "Contrato de Prescrições";
    }

    function gerarReceita(address _paciente, string memory _medicamento, uint _dosagem, string memory _medida) public apenasMedico {
        contReceitas++;
        receitas[contReceitas] = Receita(contReceitas, gerarCodigo(_medicamento),
        msg.sender, _paciente, _medicamento, _dosagem, _medida, false);
        emit ReceitaGerada(contReceitas, gerarCodigo(_medicamento), msg.sender, _paciente, _medicamento, _dosagem, _medida, false);
    }

    function gerarCodigo(string memory _medicamento) private view returns (uint) {
        uint randomico = uint(keccak256(bytes(_medicamento)));
        return randomico % moduloCodigo;
    }

    function validarReceita(uint _id) public apenasFarmacia {
        Receita memory _receita = receitas[_id];
        require(_receita.utilizada == false, "Esta receita ja foi utilizada!");
        _receita.utilizada = true;
        receitas[_id] = _receita;
        emit ReceitaValidada(_id, _receita.codigo, _receita.medico, _receita.paciente,
        _receita.medicamento, _receita.dosagem, _receita.medida, _receita.utilizada);
    }

}