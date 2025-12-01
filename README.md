# Atlantis
## 📄 Guia de Instalação:

## Pré-requisitos

* Node.js v22.17.0
* NPM v11.6.3
* React v^19.2.5
* Prisma/client v^5.10.2

## Passo a Passo

### 1. Em um terminal, clone o repositório:

```bash
git clone https://github.com/AlmdGuilherme/ATV-V-Atlantis
cd ATV-V-Atlantis
```
### 2. Instale as dependências:
#### Backend:
```bash
cd Backend
npm install
```
#### Frontend:
```bash
cd Frontend
npm install
```
### 3. Compilação:
#### Crie um banco e passe a URL do MySQL num arquivo .env: 
```bash
DATABASE_URL="mysql://root<SUA_SENHA>@localhost:3306/<NOME_DO_BANCO>
```
#### No Backend é preciso popular o banco antes:
```bash
npx primsa db seed
npm run dev
```
#### Frontend:
```bash
npm run dev
```
