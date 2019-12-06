import React, { Component } from 'react';

class Main extends Component {
  
  
  render() {
    return (
        <div id="content">
            <h3>Gerar Receita</h3>
            <br/>
            <form onSubmit={(event) => {
                event.preventDefault();
                const paciente = this.paciente.value;
                const medicamento = this.medicamento.value;
                const dosagem = this.dosagem.value;
                const medida = this.medida.value;
                this.props.gerarReceita(paciente, medicamento, dosagem, medida);
                }}>

                <div className="form-group mr-sm-2">
                    <input 
                        id="paciente"
                        type="text"
                        ref={(input) => {this.paciente = input}}
                        className="form-control"
                        placeholder="Endereço do paciente"
                        required />
                </div>
                <div className="form-group mr-sm-2">
                    <input 
                        id="medicamento"
                        type="text"
                        ref={(input) => {this.medicamento = input}}
                        className="form-control"
                        placeholder="Nome do medicamento"
                        required />
                </div>
                <div className="form-group mr-sm-2">
                    <input 
                        id="dosagem"
                        type="number"
                        ref={(input) => {this.dosagem = input}}
                        className="form-control"
                        placeholder="Dosagem"
                        required />
                </div>
                <div className="form-group mr-sm-2">
                    <select 
                        id="medida"
                        type="text"
                        ref={(input) => {this.medida = input}}
                        className="form-control"
                        placeholder="Dosagem"
                        required>
                        <option>gramas (g)</option>
                        <option>miligramas (mg)</option>
                        <option>litros (l)</option>
                        <option>mililitros (ml)</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Gerar</button>
            </form>
        </div>
    );
  }
}

export default Main;