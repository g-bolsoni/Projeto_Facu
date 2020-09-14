// importa o React
import React, {Component} from 'react'
// vamos importar a biblioteca para chamada de APIs em Rest
import axios from 'axios'

export default class TarefaForm extends Component {
    // construtor
    constructor(){
        // chama construtor da classe Component
        super()
        // criação e inicialização das variáveis da classe
        this.state = {
            descricao: "",
            realizada: false,
            criadaEm: Date.now() ,
            quem: "",
            onde: "",
            prioridade: 0,
            lista:[]
        }
        //chamar funcção que busca as tarefas
        this.buscaTarefas()
    }
    //chama a função busca tarefa
    buscaTarefas(){
        axios.get(`http://localhost:3003/api/tarefas`).then(
            resp =>{
                //atualiza o valor da lista comos dados get
                this.setState({lista: resp.data});
            }
        )
    }
    criarLinhasTabela(){
        //vamos alimentar a tabela 
        return this.state.lista.map(cadaTarefa =>(
            <tr>
                <td>{cadaTarefa.descricao}</td>
                <td>{cadaTarefa.criadaEm}</td>
                <td>{cadaTarefa.quem}</td>
                <td>{cadaTarefa.onde}</td>
                <td>{cadaTarefa.prioridade}</td>
                <td><button type="button"className="btn btn-danger">Remove</button></td>
                <td><button type="button"className="btn btn-success">Atualizar</button></td>


            </tr>
        ))
    }
    // setters
    setDescricao(e){
        this.setState({
            descricao: e.target.value
        })
    }
    setQuem(e){
        this.setState({
            quem: e.target.value
        })
    }
    setOnde(e){
        this.setState({
            onde: e.target.value
        })
    }
    setPrioridade(e){
        this.setState({
            prioridade: e.target.value
        })
    }
    // cadastrar
    cadastrar(){
        // conteúdo para inserção
        const newTask = {
            descricao: this.state.descricao,
            realizada : this.state.realizada,//usuario n informa(false)
            criadaEm: this.state.criadaEm,//user n informa(data atual)
            quem: this.state.quem,
            onde: this.state.onde,
            prioridade: this.state.prioridade
        }

        // vamos executar o método POST na URL da API inserindo newTask
        // then -> quando a resposta do POST vier, vai executar ...
        axios.post(`http://localhost:3003/api/tarefas`, newTask ).then
            (resposta => console.log(`Funcionou ${resposta.data}`))
    
    }

    // o que será mostrado ao usuário
    render(){
        return (
            <div className="form">  
                <div className="form-group">
                    <label htmlFor="descricao"> Descrição </label>
                    <input type="text" id="descricao" 
                            onChange={e => this.setDescricao(e)} 
                            value={this.state.descricao}
                            className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="quem"> Quem </label>
                    <input type="text" id="quem" 
                            onChange={e => this.setQuem(e)} 
                            value={this.state.quem}
                            className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="onde"> Onde </label>
                    <input type="text" id="onde" 
                            onChange={e => this.setOnde(e)} 
                            value={this.state.onde}
                            className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="prioridade"> Prioridade </label>
                    <input type="number" id="prioridade" onChange={e => this.setPrioridade(e)} 
                            value={this.state.prioridade}
                            className="form-control"/>
                </div>
                <div className="form-group">
                    <button type="button"
                            onClick={ e => this.cadastrar()}
                            className="btn btn-primary"> Cadastra </button> 
                </div>
                {/*Aqui teremos uma tabela  */}

                <div className="container">
                    Lista de tarefas
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Foi criada em</th>
                                <th>Quem </th>
                                <th>Onde</th>
                                <th>Prioridade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.criarLinhasTabela()}{/*cria as linhas com as tarefas*/}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}