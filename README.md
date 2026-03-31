# Avaliacao Front-end - Hearthstone CRUD

Aplicacao front-end desenvolvida como teste tecnico para gerenciamento de cartas do Hearthstone.

Deploy: https://teste-frontend-wine.vercel.app/

## Objetivo

Construir uma aplicacao web para cadastro, listagem, edicao, exclusao e filtro de cartas, com persistencia local no navegador.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod
- Radix UI
- Lucide React
- React Hot Toast

## Funcionalidades implementadas

- Cadastro de cartas
- Edicao de cartas
- Exclusao de cartas com confirmacao
- Listagem de cartas
- Filtro por ID
- Filtro por nome
- Filtro por classe
- Filtro por tipo
- Paginacao da listagem
- Validacao de formulario
- Persistencia dos dados com `localStorage`
- Layout responsivo para mobile, tablet e desktop

## Regras aplicadas

- O nome da carta e a descricao sao obrigatorios
- Classe deve ser uma das opcoes permitidas
- Tipo deve ser uma das opcoes permitidas
- Ataque deve ser inteiro entre `0` e `10`
- Defesa deve ser inteiro entre `0` e `10`

## Estrutura do projeto

```text
src/
  components/
    cardTable/
      Filters.tsx
      ModalCadastrar.tsx
      Table.tsx
  pages/
    CardsPage.tsx
  schemas/
    formSchema.ts
  services/
    localStorage.ts
  types/
    card.ts
    cardFilters.ts
    cardFiltersProps.ts
    cardTableProps.ts
    modalCadastrarTypes.ts
  App.tsx
  index.css
  main.tsx
```

## Organizacao da solucao

- A pagina principal concentra o fluxo da aplicacao em `CardsPage`
- A tabela foi separada em componentes para facilitar manutencao
- A logica de persistencia foi centralizada em `src/services/localStorage.ts`
- Os tipos foram centralizados em `src/types`
- As regras de validacao foram isoladas em `src/schemas/formSchema.ts`

## Como executar o projeto

### Pre-requisitos

- Node.js 18 ou superior
- npm

### Instalacao

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Persistencia

Os dados sao armazenados no `localStorage` do navegador usando a chave `cartas`.


## Observacoes

- O projeto nao depende de API externa
- Os dados permanecem salvos localmente no navegador enquanto o `localStorage` nao for limpo

## Autor

Desenvolvido para a avaliacao tecnica de Front-end.
