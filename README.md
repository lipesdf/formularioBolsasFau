# 💼 Interface Web para Solicitação de Bolsa Estudantil

## 🎯 Objetivo

Desenvolver uma **interface web intuitiva** usando **Angular** para facilitar o processo de solicitação de pagamento de bolsas estudantis. A aplicação concentra todas as informações em um único formulário validado em tempo real.

---

## 🧰 Tecnologias Utilizadas

- **Angular** (v19.2.16)  
- **HTML5 / CSS3**
- **TypeScript**
- **Reactive Forms** (validação em tempo real)

---

## 📋 Funcionalidades

- Formulário responsivo e fácil de preencher
- Validação imediata dos campos obrigatórios

---

## 🧩 Estrutura do Formulário

### 🔹 Projeto
- Dropdown para escolha de projetos **pré-cadastrados**.

### 🔹 Dados Cadastrais *(campos obrigatórios)*
- **Projeto**
- **Nome completo** (mínimo de 5 caracteres)
- **CPF** (formato e preenchimento válidos)
- **E-mail**
- **Telefone**
- **Endereço completo**:
  - Logradouro
  - Número
  - Bairro
  - Cidade
  - Estado
  - CEP

### 🔹 Dados para Pagamento
- **Tipo de Conta**:
  - Conta Corrente
  - Conta Poupança
---

## ✅ Validações em Tempo Real

- Nome completo com no mínimo 5 caracteres
- CPF com máscara e validação
- Endereço obrigatório com todos os campos preenchidos
- Tipo de conta selecionado obrigatoriamente
- CEP com integração da API ViaCep

---

