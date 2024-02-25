import { Box, Typography } from "@mui/material";

export default function SobreMim() {
    let sobreeu = [{
        Titulo: 'Em que posso ser util ?',
        descricao: 'Em um mundo digital em constante evolução, a habilidade de oferecer contribuições significativas é uma qualidade fundamental. Com vasta experiência em análise de SEO, desenvolvimento front-end utilizando Next.js ou Svelte, além da utilização eficaz de ferramentas como Vercel e Figma, posso oferecer uma gama diversificada de habilidades para otimizar projetos e proporcionar experiências online excepcionais. ',
    },
    {
        Titulo: 'Desenvolvimento Front-end com Next.js ou Svelte:',
        descricao: 'Ao dominar Next.js e Svelte, consigo criar interfaces web dinâmicas, responsivas e altamente performáticas. Compreendo a importância de uma arquitetura de código robusta, modular e fácil de manter, garantindo a entrega de produtos digitais de alta qualidade. ',
    },
    {
        Titulo: 'Análise de SEO:',
        descricao: 'Minha experiência em análise de SEO permite-me aprimorar a visibilidade online. Realizo auditorias detalhadas, identificando oportunidades de melhoria na estrutura, conteúdo e desempenho técnico dos sites. Implemento estratégias de palavras-chave, melhorando o posicionamento nos motores de busca e atraindo tráfego qualificado.',
    },
    {
        Titulo: 'Utilização Eficiente de Ferramentas:',
        descricao: 'Com expertise na plataforma Vercel, posso gerenciar implantações contínuas, garantindo uma entrega rápida e eficiente de projetos. Além disso, utilizo o Figma para criar designs intuitivos, colaborativos e visualmente atraentes, garantindo uma abordagem holística desde a concepção até a implementação.',
    },
    {
        Titulo: 'Gestão de Projetos de Forma Integrada:',
        descricao: 'Através de uma abordagem centrada no usuário, gerencio projetos de forma eficiente, incorporando metodologias ágeis para garantir entregas pontuais e satisfação do cliente. Utilizo plataformas de colaboração, promovendo uma comunicação transparente e eficaz durante todo o ciclo de vida do projeto.',
    },
    {
        Titulo: 'Resumo',
        descricao: 'Em resumo, estou pronto para oferecer minhas habilidades multifacetadas para impulsionar projetos, melhorar a presença online e garantir que cada aspecto seja tratado com dedicação e profissionalismo. Se você busca um colaborador versátil capaz de unir o desenvolvimento front-end, análise de SEO e a gestão integrada de projetos, estou pronto para contribuir de forma impactante e eficaz.',
    },
    ]

    return (
        <>
            {sobreeu.map(({ Titulo, descricao }, index) => (
                <Box key={index} component={'article'} mb={5}>
                    <Typography textAlign={'start'} component={'h3'} variant={'h4'}>{Titulo}</Typography>
                    <Box component={'aside'} textAlign={'start'} bgcolor={'#3C3C3C'} borderRadius={1}p={4}>
                        <Typography component={'p'}>{descricao}</Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}
