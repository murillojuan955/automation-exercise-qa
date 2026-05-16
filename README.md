# QA Automation Challenge - Automation Exercise

## Objetivo

Este projeto foi desenvolvido como solução para o desafio técnico de QA/Teste Pleno utilizando o site Automation Exercise.

O objetivo foi validar fluxos críticos de API e UI, além de aplicar conceitos de automação, testes exploratórios, BDD e análise de bugs.

---

## Tecnologias Utilizadas

- Cypress
- JavaScript
- Node.js
- VS Code

---

## Estrutura do Projeto

```txt
cypress/
├── e2e/
│   ├── api/
│   └── ui/
├── fixtures/
├── pages/
├── support/
└── utils/
```


---

## Cenários Automatizados

### API Testing

#### GET All Products List
- Validação de status code
- Validação de contrato/schema

#### POST Create/Register User
- Criação dinâmica de usuário
- Validação de resposta da API

### UI Automation

Fluxo automatizado:
- Adicionar produtos ao carrinho
- Realizar cadastro durante checkout
- Validar revisão do pedido
- Finalizar pagamento
- Validar mensagem de sucesso da compra


## Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- npm instalado

### Instalação

```bash
npm install
```

### Executar Cypress em modo visual

```bash
npx cypress open
```

### Executar testes em modo headless

```bash
npx cypress run
```


## Parte 1 - Estratégia, BDD e Testes Manuais

### Fluxo escolhido

**Place Order: Register while Checkout**

Este fluxo cobre a jornada em que um cliente adiciona produtos ao carrinho, inicia o checkout, realiza o cadastro durante a finalização da compra, revisa os produtos e conclui o pedido com pagamento.

---

## BDD - Cenários em Gherkin
```gherkin
Feature: Finalização de compra com cadastro durante o checkout

  Como um cliente novo do e-commerce
  Quero conseguir me cadastrar durante o checkout
  Para finalizar minha compra sem precisar iniciar o cadastro antes da jornada de compra

  Scenario: Cliente novo finaliza uma compra com sucesso após cadastro no checkout
    Given que o cliente possui produtos válidos no carrinho
    And ainda não possui uma conta cadastrada
    When ele inicia o processo de checkout
    And realiza o cadastro com informações obrigatórias válidas
    And confirma os dados de entrega e pagamento
    Then o pedido deve ser finalizado com sucesso
    And o sistema deve apresentar uma confirmação da compra

  Scenario: Cliente visualiza os produtos corretos antes de concluir a compra
    Given que o cliente adicionou dois produtos diferentes ao carrinho
    When ele acessa a etapa de revisão do pedido
    Then o sistema deve exibir os mesmos produtos adicionados anteriormente
    And as informações principais dos produtos devem estar disponíveis para conferência

  Scenario: Cliente não autenticado é direcionado para cadastro ao tentar finalizar compra
    Given que o cliente possui produtos no carrinho
    And não está autenticado na aplicação
    When ele tenta prosseguir para o checkout
    Then o sistema deve solicitar login ou cadastro
    And deve permitir que o cliente continue a compra após criar uma conta
    ```

    
    ## Testes Exploratórios / Edge Cases Manuais

### Edge Case 1 - Carrinho alterado durante o checkout

**Objetivo:**  
Validar se o sistema mantém a consistência do pedido quando o carrinho é alterado em outra aba durante o processo de checkout.

**Passos:**
1. Adicionar dois produtos ao carrinho.
2. Abrir o carrinho em duas abas diferentes.
3. Em uma aba, remover um dos produtos.
4. Na outra aba, tentar prosseguir com o checkout.

**Resultado esperado:**  
O sistema deve atualizar a composição do carrinho antes da finalização da compra, impedindo que o cliente conclua um pedido com informações divergentes.

**Risco coberto:**  
Inconsistência entre carrinho, revisão do pedido e pedido finalizado.

---

### Edge Case 2 - Tentativa de pagamento com dados inválidos ou incompletos

**Objetivo:**  
Validar se a aplicação impede a finalização da compra quando os dados de pagamento são inválidos ou obrigatórios não foram preenchidos.

**Passos:**
1. Adicionar produtos ao carrinho.
2. Realizar cadastro durante o checkout.
3. Avançar até a tela de pagamento.
4. Informar cartão com número inválido, CVC incompleto ou validade expirada.
5. Tentar finalizar a compra.

**Resultado esperado:**  
O sistema deve bloquear a finalização do pedido e exibir mensagens claras de validação para os campos inválidos.

**Risco coberto:**  
Pedidos aprovados sem dados mínimos de pagamento válidos.

---

### Edge Case 3 - Atualização da página durante cadastro ou pagamento

**Objetivo:**  
Validar se a jornada é preservada quando o cliente atualiza a página em etapas críticas do fluxo.

**Passos:**
1. Adicionar produtos ao carrinho.
2. Iniciar checkout.
3. Começar o cadastro do usuário.
4. Atualizar a página antes de concluir o cadastro.
5. Repetir o teste atualizando a página na tela de pagamento.

**Resultado esperado:**  
O sistema deve preservar o carrinho e orientar o cliente corretamente, sem perda indevida dos produtos ou quebra do fluxo.

**Risco coberto:**  
Perda de sessão, perda de carrinho ou abandono de compra por falha de usabilidade.

---

### Edge Case 4 - Múltiplos cliques no botão de pagamento

**Objetivo:**  
Validar se o sistema evita duplicidade de pedidos quando o cliente clica várias vezes no botão de pagamento.

**Passos:**
1. Adicionar produtos ao carrinho.
2. Realizar cadastro durante o checkout.
3. Preencher dados válidos de pagamento.
4. Clicar repetidamente no botão de pagamento.

**Resultado esperado:**  
O sistema deve processar apenas uma compra, desabilitando o botão após o primeiro clique ou tratando a requisição de forma idempotente.

**Risco coberto:**  
Criação de pedidos duplicados e possível cobrança duplicada.


## Parte 3 - Bug Report

### Bug 1 - Fluxo de checkout permite inconsistência após alteração do carrinho

**Tipo:** Bug Funcional  
**Severidade:** Alta  
**Prioridade:** Alta  

#### Ambiente
- Navegador: Chrome 148
- Sistema Operacional: Windows 11
- Ambiente: Produção
- URL: https://automationexercise.com

#### Descrição
Durante o fluxo de checkout, é possível gerar inconsistência entre a revisão do pedido e o estado atual do carrinho quando alterações são realizadas em outra aba da aplicação.

#### Pré-condição
Usuário possuir produtos adicionados ao carrinho.

#### Passos para reproduzir
1. Adicionar dois produtos ao carrinho.
2. Abrir o carrinho em duas abas diferentes do navegador.
3. Em uma das abas, remover um dos produtos.
4. Na outra aba, prosseguir normalmente para o checkout.
5. Revisar os produtos antes da finalização da compra.

#### Resultado atual
O sistema mantém informações desatualizadas na revisão do pedido, permitindo que o usuário avance com dados inconsistentes.

#### Resultado esperado
A aplicação deve sincronizar o estado do carrinho antes da finalização do pedido, garantindo consistência entre revisão e pedido final.

#### Impacto
Possibilidade de pedidos inconsistentes, divergência entre itens exibidos e itens efetivamente comprados.

---

### Bug 2 - Fluxo de pagamento não protege contra múltiplos cliques

**Tipo:** Bug Funcional / UX  
**Severidade:** Crítica  
**Prioridade:** Alta  

#### Ambiente
- Navegador: Chrome 148
- Sistema Operacional: Windows 11
- Ambiente: Produção
- URL: https://automationexercise.com

#### Descrição
O botão de confirmação de pagamento permite múltiplos cliques consecutivos sem bloqueio visual ou funcional durante o processamento da compra.

#### Pré-condição
Usuário estar na etapa final de pagamento.

#### Passos para reproduzir
1. Adicionar produtos ao carrinho.
2. Realizar cadastro/login.
3. Avançar até a tela de pagamento.
4. Preencher dados válidos.
5. Clicar múltiplas vezes rapidamente no botão de pagamento.

#### Resultado atual
O sistema permite múltiplas interações simultâneas durante o processamento da compra.

#### Resultado esperado
O botão deve ser desabilitado após o primeiro clique ou o backend deve tratar a operação de forma idempotente para evitar duplicidade.

#### Impacto
Risco de criação de pedidos duplicados, duplicidade de cobrança e impacto negativo na experiência do usuário.

---

### Melhoria de UX Observada

#### Problema
Durante o fluxo de checkout, a navegação entre login, cadastro e carrinho pode gerar confusão para usuários não autenticados.

#### Sugestão
Melhorar a experiência do modal de checkout exibindo mensagens mais claras e redirecionamentos mais intuitivos após autenticação.

#### Benefício esperado
Redução de abandono de compra e melhoria da experiência de usuários novos.

## Melhorias Futuras

- Implementação de Page Objects
- Integração com CI/CD
- Geração de relatórios automatizados
- Execução paralela dos testes
- Testes negativos automatizados