# Bazar da Anna

App de controle do bazar: catálogo de peças, registro de vendas e caixa.
Roda no navegador do celular, sem servidor e sem banco de dados — os dados
ficam guardados no próprio aparelho (`localStorage`).

## Arquivos

| Arquivo | O que é |
| --- | --- |
| `index.html` | O app inteiro (HTML, CSS e JavaScript num arquivo só) |
| `manifest.json` | Faz o iPhone instalar como app, em tela cheia |
| `sw.js` | Service worker: deixa abrir sem internet |
| `icon.svg` | Ícone da tela de início |

## Testar no computador

```sh
python -m http.server 8000
```

Abrir `http://localhost:8000`. No Chrome, F12 → ícone de celular para ver no
tamanho do iPhone.

## Publicar no GitHub Pages

1. Criar um repositório novo em <https://github.com/new> (pode ser público).
2. Na pasta do projeto:

   ```sh
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
   git push -u origin main
   ```

3. No repositório: **Settings → Pages → Source: Deploy from a branch →
   Branch `main` / `(root)` → Save**.
4. Em um ou dois minutos o app fica em
   `https://SEU_USUARIO.github.io/SEU_REPO/`.

## Instalar no iPhone

Abrir o endereço **no Safari** (não funciona pelo Chrome do iPhone) →
botão Compartilhar → **Adicionar à Tela de Início**.

## Atualizar o app depois

Editar `index.html`, subir o número da versão em `sw.js` (`bazar-v1` →
`bazar-v2`) e dar `git push`. Sem trocar a versão, o celular continua
mostrando a cópia antiga.

## Backup

Os dados vivem só no celular. O iOS apaga o armazenamento de sites que ficam
semanas sem uso — como o app fica instalado na tela de início, o risco é
baixo, mas não é zero.

Botão **A** (canto superior direito da tela Início) → **Salvar cópia dos
dados** gera um `.json` para guardar em Arquivos, iCloud ou WhatsApp.
O mesmo menu tem **Restaurar de uma cópia**.

## Licença

MIT — veja [LICENSE](LICENSE). Pode usar, modificar e distribuir à vontade,
mantendo o aviso de copyright.

**Sem garantia.** O app é oferecido gratuitamente e "como está". Os dados
ficam apenas no aparelho de quem usa, e o autor não se responsabiliza por
perda de dados ou prejuízos decorrentes do uso. Faça cópias de segurança
pelo menu do app.
