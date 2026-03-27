const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware que converte o corpo das requisições JSON em objetos acessíveis via req.body
app.use(express.json());

// Definição dos caminhos
const raizProjeto = __dirname;
const caminhoMars = path.join(raizProjeto, 'Mars4_5.jar');
const caminhoAssembly = path.join(raizProjeto, 'backend.mar');
const caminhoHTML = path.join(raizProjeto, 'index.html');

// 1. Rota Frontend (GET /)
// Serve o arquivo HTML principal quando o usuário acessa a raiz.
app.get('/', (req, res) => {
    if (fs.existsSync(caminhoHTML)) {
        res.sendFile(caminhoHTML);
    } else {
        res.status(404).send(`Erro: Arquivo index.html não encontrado em ${raizProjeto}`);
    }
});

// 2. Rota API (POST /roteiro)
// Recebe os dados do formulário e invoca o processo Java/MIPS.
app.post('/roteiro', (req, res) => {
    const dados = req.body;
    // Serializa os dados recebidos para o formato de entrada do console (stdin)
    // O '\n' simula a tecla ENTER após cada resposta.
    const inputStr = `${dados.estado}\n${dados.custo}\n${dados.atividade}\n${dados.sensorial}\n${dados.seletividade}\n`;

    // Inicia o processo filho (Child Process)
    const processo = spawn('java', [
        '-Dfile.encoding=UTF-8',   // Força encoding UTF-8 (acentuação correta)
        '-Xmx128m',                // Limita RAM do Java a 128MB (economia de recursos)
        '-XX:+TieredCompilation',  // Otimização: Início rápido da JVM
        '-XX:TieredStopAtLevel=1', // Otimização: Compilação nível 1 (foco em CLI/Client)
        '-jar',
        caminhoMars,
        'nc',                      // Argumento MARS: No Copyright (limpa saída inicial)
        caminhoAssembly
    ]);

    let saidaTexto = '';
    let erroTexto = '';

    // Envia os dados simulando digitação no teclado
    processo.stdin.write(inputStr);
    processo.stdin.end(); // Fecha o input para sinalizar que acabamos de digitar

    // Escuta a resposta do terminal (stdout)
    processo.stdout.on('data', (c) => saidaTexto += c.toString());

    // Escuta possíveis erros (stderr)
    processo.stderr.on('data', (c) => erroTexto += c.toString());

    // Evento disparado quando o processo Java termina
    processo.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ sucesso: false, erro: "Falha interna no simulador." });
        }

        // Lógica de parse que busca a string onde começa o resultado
        const marcador = "VENCEDOR (OPCAO RECOMENDADA):";
        let resultadoFinal = saidaTexto;

        if (saidaTexto.includes(marcador)) {
            // Pega tudo que vem depois do marcador
            resultadoFinal = `${marcador}${saidaTexto.split(marcador)[1]}`.trim();
        }

        return res.json({ sucesso: true, resultado: resultadoFinal });
    });
});

// Inicialização
app.listen(PORT, () => {
    console.log(`\n🚀 Middleware rodando em http://localhost:${PORT}`);
});
