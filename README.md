# Music App

## Descrição
Music App é uma aplicação de streaming de música desenvolvida como um projeto de avaliação. Ela permite aos usuários pesquisar álbuns de artistas, ouvir músicas e gerenciar suas favoritas. A aplicação utiliza várias rotas para oferecer uma experiência interativa e dinâmica.

## Rotas e Componentes
A aplicação utiliza `BrowserRouter` para gerenciar as rotas, e cada uma delas renderiza um componente específico:
- **/**: Página de Login.
- **/search**: Página de Pesquisa de artistas e álbuns.
- **/album/:id**: Página do Álbum, exibindo as músicas.
- **/favorites** (bônus): Página de Músicas Favoritas.
- **/profile** (bônus): Página de Perfil do Usuário.
- **/profile/edit** (bônus): Página de Edição do Perfil.
- **Qualquer outra rota**: Página de NotFound.

## Requisitos
⚠️ **Atenção:** Pull requests com erros de Linter não serão avaliados.

1. **Formulário de Identificação**: Dentro do componente Login, um formulário para identificação do usuário.
2. **Formulário de Pesquisa de Artistas**: No componente Search, um formulário para pesquisar álbuns de artistas.
3. **Lista de Músicas do Álbum**: No componente Album, exibição das músicas do álbum selecionado.
4. **Componente de Cabeçalho**: Criação do componente Header.
5. **Mecanismo de Músicas Favoritas**: No componente MusicCard, a funcionalidade de adicionar músicas às favoritas.

## Tecnologias Utilizadas
- React
- React Router
- HTML/CSS/JavaScript
- APIs de Música

## Autor
[Seu Nome]

## Notas
Este projeto simula um aplicativo de streaming de música, envolvendo conhecimentos em React, gerenciamento de estado, rotas e requisições a APIs externas.


