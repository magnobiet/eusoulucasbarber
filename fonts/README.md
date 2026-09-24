# Fontes para Open Graph

As fontes desta pasta são usadas apenas nas imagens de Open Graph. A configuração da família, dos arquivos, pesos e estilos fica em [`opengraph-image.tsx`](../src/app/opengraph-image.tsx).

## Como adicionar uma fonte

1. Baixe a família no [Google Fonts](https://fonts.google.com/).
2. Descompacte o arquivo ZIP, por exemplo, `Roboto.zip`.
3. Entre na pasta `static` e selecione apenas os arquivos que serão usados.
4. Crie uma pasta para a família e copie os arquivos selecionados.
5. Deixe a estrutura plana e renomeie os arquivos em `dash-case`.

## Estrutura do download

Ao descompactar `Roboto.zip`, a estrutura será parecida com esta:

```text
Roboto.zip
└── Roboto/
    ├── OFL.txt
    ├── README.txt
    ├── Roboto-Italic-VariableFont_wdth,wght.ttf
    ├── Roboto-VariableFont_wdth,wght.ttf
    └── static/
        ├── Roboto-Black.ttf
        ├── Roboto-Bold.ttf
        ├── Roboto-BoldItalic.ttf
        ├── Roboto-Italic.ttf
        ├── Roboto-Light.ttf
        ├── Roboto-Medium.ttf
        ├── Roboto-Regular.ttf
        └── ...
```

## Estrutura final

Para facilitar o uso, mantenha apenas os pesos e estilos necessários. A estrutura final deve ficar plana, com os nomes em `dash-case`:

```text
roboto/
├── roboto-bold.ttf
└── roboto-regular.ttf
```

Depois disso, o arquivo ZIP e a pasta descompactada podem ser removidos.
