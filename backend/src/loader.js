// carrega configuração do servidor
const server = require('./config/server')
// carrega configuração do banco de dados
require('./config/database')

// carrega configuração da rota
require('./config/router')(server)

