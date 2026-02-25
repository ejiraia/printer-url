# 🚀 Thermal Print API (Electron + Selenium)
Uma solução robusta e flexível para transformar qualquer página Web em um cupom para impressoras térmicas POS.

Este projeto foi criado para superar as limitações de diagramação das bibliotecas tradicionais (ESC/POS), permitindo o uso de HTML5 e CSS3 para criar layouts complexos, com logotipos, tabelas e fontes personalizadas de forma simples.

# 🛠️ Como funciona?
O aplicativo sobe um servidor local (API).

Você envia uma requisição contendo a URL da página que deseja imprimir.

O app utiliza o Selenium para renderizar a página em segundo plano.

O comando de impressão é enviado automaticamente para a impressora térmica padrão.

# ✨ Vantagens
Diagramação Ilimitada: Use Flexbox, Grid e fontes personalizadas.

Fácil Integração: Qualquer linguagem que faça requisições HTTP (JS, Python, PHP, C#, etc) pode imprimir.

Independência de Hardware: Compatível com qualquer impressora instalada no Windows (80mm, 58mm, etc).

Renderização Fiel: O que você vê no navegador é o que sai no papel.

# 📦 Instalação (Windows)
Para facilitar o uso, disponibilizei um instalador executável:

Vá até a seção Releases.

Baixe o arquivo Instalador_Print_API.exe.

Siga as instruções do assistente de instalação.

O app será configurado para iniciar com o Windows (opcional).

# 🚀 Exemplo de Uso (API)
Para imprimir, basta fazer um POST para o endpoint local:


```
// JSON  POST http://localhost:3000/print-url
{
  "url": "https://meusite.com/comprovante/123",
}
```