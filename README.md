# MarketPlace - React Native App

A marketplace application developed with React Native, TypeScript, Redux Toolkit, and React Navigation.

## 📋 Prerequisites

- Node.js >= 18
- Yarn or npm
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

## 🚀 How to Install the Project

### 1. Clone the repository
```bash
git clone https://github.com/welington-olive/MarketPlace.git
cd MarketPlace
```

### 2. Install dependencies
```bash
# Using Yarn (recommended)
yarn install

# Or using npm
npm install
```

### 3. Install iOS dependencies (macOS only)
```bash
cd ios
pod install
cd ..
```

### 4. Configure environment variables (if needed)
Create a `.env` file in the project root if there are specific configurations.

## 🏃‍♂️ How to Run the Project

### Android
```bash
# Start Metro bundler
yarn start

# In another terminal, run the Android app
yarn android
```

### iOS (macOS only)
```bash
# Start Metro bundler
yarn start

# In another terminal, run the iOS app
yarn ios
```

## 🧪 How to Run Tests

### Run all tests
```bash
# Using Yarn
yarn test

# Or using npm
npm test
```

## 🔗 Deep Links

### How to use Deep Links

The application supports deep links with the `marketplace://` scheme. To test deep links, you need to use the `deep-link-test.html` file that is in the project root.

### Why use the HTML file?

Modern browsers (like Chrome) block the automatic execution of links with custom schemes (`marketplace://`, `intent://`) when typed directly in the address bar. For security reasons, only clickable links (via `<a href="...">`) or user interactions can trigger deep links.

### How to test Deep Links

1. **Copy the `deep-link-test.html` file to the device** where the APK is installed
2. **Open the HTML file** in the device's browser
3. **Click the buttons** to test different deep links

### Available Deep Links

- `marketplace://` - Navigate to home screen
- `marketplace://product/1` - Navigate to product with ID 1
- `marketplace://product/2` - Navigate to product with ID 2
- `marketplace://product/123` - Navigate to product with ID 123

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── constants/          # Application constants
├── hooks/              # Custom hooks
├── i18n/               # Internationalization
├── navigation/         # Navigation configuration
├── screens/            # Application screens
├── services/           # Services and APIs
├── store/              # Redux store and slices
└── types/              # TypeScript type definitions
```

## 📱 Technologies Used

- **React Native** - Mobile framework
- **TypeScript** - Static typing
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **Styled Components** - Styling
- **Jest** - Testing
- **Axios** - HTTP requests

---

# MarketPlace - Aplicativo React Native

Um aplicativo de marketplace desenvolvido em React Native com TypeScript, Redux Toolkit e React Navigation.

## 📋 Pré-requisitos

- Node.js >= 18
- Yarn ou npm
- React Native CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 🚀 Como Instalar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/welington-olive/MarketPlace.git
cd MarketPlace
```

### 2. Instale as dependências
```bash
# Usando Yarn (recomendado)
yarn install

# Ou usando npm
npm install
```

### 3. Instale as dependências do iOS (apenas macOS)
```bash
cd ios
pod install
cd ..
```

### 4. Configure as variáveis de ambiente (se necessário)
Crie um arquivo `.env` na raiz do projeto se houver configurações específicas.

## 🏃‍♂️ Como Executar o Projeto

### Android
```bash
# Inicie o Metro bundler
yarn start

# Em outro terminal, execute o app Android
yarn android
```

### iOS (apenas macOS)
```bash
# Inicie o Metro bundler
yarn start

# Em outro terminal, execute o app iOS
yarn ios
```

## 🧪 Como Executar os Testes

### Executar todos os testes
```bash
# Usando Yarn
yarn test

# Ou usando npm
npm test
```

## 🔗 Deep Links

### Como usar Deep Links

O aplicativo suporta deep links com o esquema `marketplace://`. Para testar os deep links, você precisa usar o arquivo `deep-link-test.html` que está na raiz do projeto.

### Por que usar o arquivo HTML?

Navegadores modernos (como o Chrome) bloqueiam a execução automática de links com esquema personalizado (`marketplace://`, `intent://`) quando digitados diretamente na barra de endereços. Por questões de segurança, apenas links clicáveis (via `<a href="...">`) ou interações de usuário podem disparar deep links.

### Como testar Deep Links

1. **Copie o arquivo `deep-link-test.html` para o dispositivo** onde o APK está instalado
2. **Abra o arquivo HTML** no navegador do dispositivo
3. **Clique nos botões** para testar diferentes deep links

### Deep Links disponíveis

- `marketplace://` - Navega para a tela inicial
- `marketplace://product/1` - Navega para o produto com ID 1
- `marketplace://product/2` - Navega para o produto com ID 2
- `marketplace://product/123` - Navega para o produto com ID 123

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── constants/          # Constantes da aplicação
├── hooks/              # Custom hooks
├── i18n/               # Internacionalização
├── navigation/         # Configuração de navegação
├── screens/            # Telas da aplicação
├── services/           # Serviços e APIs
├── store/              # Redux store e slices
└── types/              # Definições de tipos TypeScript
```

## 📱 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **TypeScript** - Tipagem estática
- **Redux Toolkit** - Gerenciamento de estado
- **React Navigation** - Navegação
- **Styled Components** - Estilização
- **Jest** - Testes
- **Axios** - Requisições HTTP