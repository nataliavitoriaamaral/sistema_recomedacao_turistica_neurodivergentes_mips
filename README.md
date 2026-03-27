# Sistema de Recomendação Turística Inclusiva para pessoas Neurodivergentes

## Sobre 
O projeto tem como objetivo desenvolver um sistema que oferece experiências de turismo personalizadas, acessíveis e inclusivas. Por meio de um quiz interativo, o programa sugere destinos na região Sul do Brasil adequados ao perfil do usuário, considerando preferências individuais, restrições econômicas e necessidades de acessibilidade. 

O grande diferencial da aplicação é o foco na inclusão de pessoas neurodivergentes (TEA).O sistema atua como uma ferramenta para tornar a experiência turística mais acolhedora e segura, filtrando ambientes adequados baseados em perfis sensoriais (nível de estímulo/agito).

## Arquitetura 
Para oferecer uma experiência amigável ao usuário final sem perder a complexidade da linguagem de máquina, o sistema foi dividido em três camadas:
* **Back-end:** Desenvolvido em linguagem Assembly MIPS e executado no simulador MARS. Responsável pelo processamento, cálculo de score e ordenação de dados.
* **Middleware:** Desenvolvido em Node.js, atua como ponte de comunicação entre a interface web e o simulador MIPS via processos de terminal (CLI).
* **Front-end:** Aplicação Web (HTML/JS) que substitui o console tradicional do MIPS por um formulário dinâmico e responsivo.

## Minhas Contribuições: 
Neste projeto em equipe, atuei diretamente no desenvolvimento do **Back-end em Assembly MIPS**, sendo responsável pelas seguintes implementações:
* **Algoritmo de Recomendação e Score:** Implementação da lógica aritmética que define a pontuação ponderada de cada destino, incluindo a criação da "penalidade de segurança" (-100 pontos) para casos de incompatibilidade sensorial.
* **Estruturas de Dados e Buffer:** Criação de uma estrutura de buffer dinâmico na memória para gerenciar múltiplos vencedores em caso de empates técnicos.
* **Ordenação (Bubble Sort):** Codificação do algoritmo Bubble Sort em Assembly para organizar alfabeticamente a lista de recomendações adicionais ("Explore Mais").
* **Otimização de Memória:** Implementação de rotinas de comparação de endereços para impedir a impressão duplicada de informações logísticas (hotéis/restaurantes) na tela final.

## Tecnologias Utilizadas
* Assembly MIPS (MARS Simulator);
* Node.js & Express (Middleware);
* JavaScript, HTML & CSS (Front-end);
* Estruturas de Dados (Vetores Paralelos, Alocação de Memória).

## Equipe de Desenvolvimento
Projeto desenvolvido colaborativamente para a disciplina de Arquitetura e Organização de Computadores (UNIFESP):
* **Natália Vitória Amaral do Val** 
* **Caio Peternela de Souza** 
* **João Vitor Mancio Chaves** 
* **José Luiz de Oliveira Ferreira**

*(A documentação completa, contendo o mapeamento de memória e arquitetura do software, está disponível no PDF anexado a este repositório).*
