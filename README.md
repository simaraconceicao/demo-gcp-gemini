# TDC SUMMIT AI - Simara Conceição 🚀 

![image](https://media2.giphy.com/media/D567hs4Dex0GEnAKOY/giphy.gif)
<aside>
⚠️ Este repositório foi criado para disponibilizar o código apresentado no TDC Summit AI
</aside>

<br>

## `Palestra:`

IA Generativa na Prática: Desenvolvendo uma aplicação serverless no GCP com Node.js e Gemini

Esta será uma jornada prática, onde abordarei os conceitos fundamentais dentro do universo da IA generativa. Mostrarei como os provedores de nuvem podem acelerar o aprendizado desse tema e farei uma demo interativa em Node.js para construir uma aplicação serverless usando o poderoso modelo Gemini do Google Cloud.

## `Slides`

✓		[Slides](https://docs.google.com/presentation/d/1KwSK90bPhtSto_FLPP0Xq-g8apsJ0MBAPmANBUaYh48/edit?usp=sharing)


## Descrição da aplicação:
É uma aplicação que tem como objetivo melhorar a experiência online de pessoas cegas e de baixa visão. Uma aplicação serverless que é um gerador de texto alternativo de imagens que pode ser usado por todas as pessoas para gerarem textos alternativos que possam ser postados em redes sociais ou usados para aplicações web.

Arquitetura da aplicação:
1. Salvamento da imagem no Cloud Storage:
O Cloud Storage recebe o upload e armazena a imagem no bucket configurado.
O nome da imagem pode é gerado automaticamente
Metadados adicionais podem ser enviados junto com a imagem, como nome original e tipo de arquivo.

2. Trigger da Cloud Function:
Uma Cloud Function é configurada para ser executada em resposta a uploads no bucket.
A Cloud Function recebe o evento de upload como parâmetro, contendo informações sobre a imagem.
A partir do evento, a Cloud Function extrai o nome da imagem e outras informações relevantes.

3. Análise da imagem com Gemini:
A Cloud autentica com google-auth-library
Function utiliza a API do Gemini para gerar a descrição da imagem.
A API do Gemini recebe a imagem como parâmetro e retorna um JSON com as descrições geradas.
A Cloud Function pode processar as descrições e formatá-las de acordo com a necessidade do front-end.

## Componentes da arquitetura:
![image](https://media.licdn.com/dms/image/D4D12AQGSQBM6tWEyTw/article-inline_image-shrink_1500_2232/0/1709782018942?e=1717027200&v=beta&t=MyODVs9Uze5xZz0x3xoR-KWi2fjZufqctSwRQZqlo68)

Cloud Storage: Armazena a imagem enviada pelo front-end.
Cloud Function: Executada em resposta a uploads no Cloud Storage e utiliza o Gemini para gerar a descrição da imagem.
API do Gemini: Gera a descrição da imagem a partir de um arquivo de imagem.

## Passo a passo:
Passo 1 - Você precisa ter uma conta no GCP(Google Cloud Platform), com os créditos iniciais ativos e um projeto

Tutorial para criar conta no Google Cloud Platform (GCP) com créditos e projeto
1. Acesse o site do GCP:
Acesse https://cloud.google.com/.
Clique em "Comece agora".
2. Crie uma conta Google:
Se você já possui uma conta Google (Gmail), faça login.
Se não, clique em "Criar conta" e siga as instruções.
3. Ative os créditos gratuitos:
Na página "Comece agora", clique em "Ativar créditos".
Siga as instruções na tela para verificar seu cartão de crédito ou conta bancária.
Você receberá $300 em créditos gratuitos que podem ser usados durante 90 dias.
4. Crie um projeto:
Na parte superior da página, clique em "Selecionar projeto".
Clique em "Criar projeto".
Insira um nome para o projeto e selecione uma organização (se aplicável).
Clique em "Criar".
Pronto! Sua conta no GCP está configurada com créditos gratuitos e um projeto.

Passo 2 - Crie um Bucket no Cloud Storage
Tutorial como criar um bucket no Google Cloud Storage usando o Google Cloud Console
Acesse o Google Cloud Console: Acesse https://console.cloud.google.com/.
Selecione ou crie um projeto: Na barra superior, certifique-se de ter selecionado o projeto apropriado onde deseja criar o bucket. Se você não tiver um projeto, poderá criar um clicando no menu suspenso e selecionando "Criar projeto".
Navegue até o Cloud Storage: No menu de navegação à esquerda, clique em "Armazenamento".
Crie um bucket: Clique no botão "Criar bucket".
Forneça detalhes do bucket: Preencha os seguintes detalhes na caixa de diálogo "Criar bucket":Nome do bucket: Escolha um nome exclusivo para seu bucket. Os nomes de bucket devem ser globalmente únicos e seguir regras de nomenclatura específicas (https://cloud.google.com/storage/docs/buckets).Local: Selecione um local para seu bucket. Isso determina onde seus dados são armazenados geograficamente.Classe de armazenamento: Escolha a classe de armazenamento com base na frequência de acesso aos dados e na durabilidade desejada. O armazenamento padrão é um bom ponto de partida para a maioria dos casos de uso.Acesso Uniforme (opcional): Se planeja acessar seu bucket de vários projetos do Google Cloud, habilite o Acesso Uniforme.
Revise e crie: Revise suas configurações e clique no botão "Criar" para criar o bucket.

Passo 3 - Crie uma Cloud Function com trigger pelo bucket criado
Tutorial para criar uma Cloud Function com trigger pelo bucket criado no console
Acesse o Google Cloud Console:Vá para https://console.cloud.google.com/.
Navegue até o Cloud Functions:No menu de navegação à esquerda, clique em "Funções em nuvem".
Crie uma função:Clique no botão "Criar função".
Preencha os detalhes da função:Nome: Insira um nome único para sua função.Ambiente de tempo de execução: Selecione o ambiente de tempo de execução para sua função. Node.js 20 é uma boa escolha para a maioria dos casos.Trigger: Na seção "Trigger", selecione "Cloud Storage" como o tipo de trigger.Bucket: Selecione o bucket que você deseja usar como trigger.Evento: Selecione o evento que deseja acionar a função. Por exemplo, você pode escolher "Criar objeto" para acionar a função sempre que um novo objeto for carregado no bucket.

Passo 4 - Baixe as chaves da sua conta de serviço
Tutorial para baixar a chave da sua conta de serviço:
Acesse o Console do Google Cloud Platform.
No menu à esquerda, clique em "IAM & Admin".
Clique em "Serviços de conta".
Na lista de serviços de conta, localize o serviço de conta que você deseja baixar a chave.
Clique no nome do serviço de conta.
Clique na guia "Chaves".
Clique em "Adicionar chave" e selecione "Criar nova chave".
Na caixa de diálogo "Criar chave", selecione o tipo de chave que você deseja baixar.
Clique em "Criar".
Clique em "Fechar".
Sua chave será baixada para o seu computador.

Passo 5 - Insira o código-fonte: 
Arquivo package.json 
Arquivo servicos.json ou .env 
index.js

Passo 6 - Certifique-se de inserir todas as configurações corretamente e clique em implantar

Passo 7 - Após implantação concluída com sucesso, só seguir o passo a passo da Demo: 
Subir uma imagem no formato jpeg no bucket
Mostrar a imagem que vai subir para análise e descrição
Mostrar Logs com o resultado com a descrição ainda em inglês


-----
_Foi incrível compartilhar essa jornada com você! Qualquer dúvida ou sugestão, chama no contatinho!_

 <img src="https://media.giphy.com/media/efhcZv18NpQDyRsaYa/giphy.gif" alt="Gif Yeah" width="200"> 

# Simara Conceição
✓	Desenvolvedora na Thoughtworks

✓	Criadora do Quero Ser Dev, projeto que inspira e ajuda pessoas diversas na migração de carreira pra área de tecnologia.

### Vamos nos conectar!

- [youtube](https://www.youtube.com/queroserdev)
- [instagram](https://www.instagram.com/simara_conceicao)
- [linkedin](https://www.linkedin.com/in/simaraconceicao/)
- [Assine a Newsletter - Cabeça na Nuvem](https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7149947947386822656)
- [github](https://github.com/simaraconceicao)
- [spotify](https://open.spotify.com/show/59vCz4TY6tPHXW26qJknh3)
- [quero ser dev](https://queroserdev.com)

<br>
Feito com 💜 por Simara Conceição | Quero Ser Dev