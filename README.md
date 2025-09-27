# ⚛️ ZapFlow - Frontend Dashboard

![GitHub language count](https://img.shields.io/github/languages/count/lucaslirah/zapflow-frontend?color=%2361DAFB)
![GitHub top language](https://img.shields.io/github/languages/top/lucaslirah/zapflow-frontend?color=%2361DAFB)
![GitHub last commit](https://img.shields.io/github/last-commit/lucaslirah/zapflow-frontend)
![License](https://img.shields.io/github/license/lucaslirah/zapflow-frontend)

Uma interface web moderna e reativa, construída com React.js, para consumir a API do ZapFlow e gerenciar sessões do WhatsApp de forma visual e intuitiva.

> **Este é o repositório do Frontend.** O Backend (API) que esta aplicação consome está em um repositório separado.

> ➡️ **[Acesse o repositório do Backend aqui](https://github.com/lucaslirah/zapflow_project)**

---

## 📸 Demonstração

A interface do ZapFlow Dashboard oferece um painel de controle centralizado para todas as operações de automação do WhatsApp, com feedback visual em tempo real para o usuário.

![Animação_zapflow](https://github.com/user-attachments/assets/8678018b-e695-4da6-b877-e056395b0352)


> A aplicação foi desenvolvida com **React.js** e se comunica com um backend robusto em **Node.js**, que persiste os dados em um banco de dados **PostgreSQL** na **AWS RDS**, garantindo alta performance e escalabilidade.

## ✨ Funcionalidades

-   **Interface Intuitiva:** Formulários claros para gerenciar configurações do Trello e iniciar sessões do WhatsApp.
-   **Visualização de QR Code:** Exibe o QR Code de autenticação diretamente na tela para facilitar a conexão.
-   **Feedback em Tempo Real:** Utiliza `react-toastify` para fornecer notificações instantâneas sobre o status das operações (sucesso, erro, aviso).
-   **Gerenciamento de Estado Local:** Persiste o último ID de sessão e configuração utilizados no `localStorage` do navegador, permitindo salvar e limpar os dados para agilizar o uso recorrente.
-   **Animações e Transições:** Efeitos sutis de CSS para uma experiência de usuário mais fluida e agradável.
-   **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, permitindo o gerenciamento a partir de desktops ou dispositivos móveis.

## 💻 Tecnologias e Ferramentas

O frontend foi construído com um ecossistema moderno de ferramentas JavaScript, focando em uma experiência de desenvolvimento produtiva e uma aplicação final performática.

| Tecnologia | Descrição |
| :--- | :--- |
| **React.js** | Biblioteca para a construção de interfaces de usuário reativas e componentizadas. |
| **React Hooks** | Utilizados para gerenciamento de estado (`useState`) e ciclo de vida (`useEffect`) nos componentes. |
| **Axios** | Cliente HTTP para realizar requisições à API do backend de forma simples e segura. |
| **React Toastify** | Biblioteca para a exibição de notificações (toasts) elegantes e customizáveis. |
| **React Icons** | Pacote que inclui milhares de ícones populares para uso nos componentes. |
| **CSS3** | Estilização feita com CSS puro, utilizando classes bem definidas e animações. |
| **Vite / Create React App**| Ferramenta de build e servidor de desenvolvimento para aplicações React. |

## 💡 Arquitetura e Boas Práticas

-   **Arquitetura Baseada em Componentes:** A interface é dividida em componentes reutilizáveis e de responsabilidade única (ex: `SessionController`, `TrelloConfigForm`), facilitando a manutenção e escalabilidade do código.
-   **Serviço de API Centralizado:** As configurações do `Axios` e a comunicação com o backend estão isoladas em um módulo de serviço (`src/services/api.js`), desacoplando a lógica de UI da lógica de dados.
-   **Gerenciamento de Estado com Hooks:** O estado da aplicação é gerenciado de forma local e eficiente dentro dos componentes, utilizando o poder dos Hooks nativos do React.
-   **Experiência do Usuário (UX):** Foco em fornecer feedback claro e imediato ao usuário através de notificações, badges de status e animações, tornando a aplicação mais intuitiva.

## 🚀 Como Instalar e Rodar o Projeto

Siga os passos abaixo para ter o frontend rodando em sua máquina local.

### Pré-requisitos

-   **Backend Ativo:** O backend do ZapFlow **deve estar rodando** para que o frontend possa se comunicar com a API. Siga as instruções de instalação no **[README do backend](https://github.com/lucaslirah/zapflow_project)**.
-   [Node.js](https://nodejs.org/) (v16 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/lucaslirah/zapflow-frontend.git](https://github.com/lucaslirah/zapflow-frontend.git)
    ```

2.  **Navegue para a pasta do projeto:**
    ```bash
    cd zapflow-frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Copie o arquivo `.env.example` para `.env`.
    -   Verifique se a variável `REACT_APP_API_URL` aponta para o endereço onde seu backend está rodando (por padrão, `http://localhost:3001`).

    ```bash
    cp .env.example .env
    ```

5.  **Inicie a aplicação:**
    ```bash
    npm start
    ```

✅ Pronto! A aplicação React será aberta no seu navegador, geralmente em `http://localhost:3000`.

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ por **Lucas Lira**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lucaslirah)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-lira-dev/)
