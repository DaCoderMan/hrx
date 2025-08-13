import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTwitter } from 'react-icons/fa';
import LoginForm from './components/LoginForm';
import TrendingTopics from './components/TrendingTopics';
import grokService from './services/grokService';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock trending topics data with popular tweets (in a real app, this would come from an API)
  const mockTrendingTopics = [
    { 
      id: 1, 
      topic: "Gestão de Pessoas", 
      tweets: 15420, 
      category: "Leadership",
      popularTweets: [
        { id: 1, text: "A verdadeira liderança não é sobre ter seguidores, mas sobre criar outros líderes. #GestãoDePessoas #Liderança", author: "@hr_expert", likes: 2340, retweets: 890, comments: 156 },
        { id: 2, text: "Feedback construtivo é a base do desenvolvimento profissional. Como você tem dado feedback na sua equipe? #Feedback #Gestão", author: "@manager_br", likes: 1890, retweets: 567, comments: 234 },
        { id: 3, text: "O sucesso de uma empresa está diretamente ligado ao bem-estar dos seus colaboradores. #BemEstar #Sucesso", author: "@rh_brasil", likes: 1670, retweets: 445, comments: 189 },
        { id: 4, text: "Líderes que escutam mais do que falam são os que mais inspiram suas equipes. #EscutaAtiva #Inspiração", author: "@leadership_pt", likes: 1450, retweets: 378, comments: 123 },
        { id: 5, text: "Reconhecimento é combustível para motivação. Como você reconhece o trabalho da sua equipe? #Reconhecimento", author: "@gestao_pessoas", likes: 1230, retweets: 289, comments: 98 },
        { id: 6, text: "A comunicação clara e transparente é essencial para o sucesso de qualquer equipe. #Comunicação #Transparência", author: "@comunicacao_rh", likes: 1120, retweets: 234, comments: 87 },
        { id: 7, text: "Delegação eficiente é uma arte que todo líder deve dominar. #Delegação #Eficiência", author: "@lideranca_efetiva", likes: 980, retweets: 198, comments: 76 },
        { id: 8, text: "O desenvolvimento de talentos deve ser prioridade em qualquer organização. #Desenvolvimento #Talento", author: "@talentos_br", likes: 890, retweets: 167, comments: 65 },
        { id: 9, text: "A confiança é a base de qualquer relacionamento profissional de sucesso. #Confiança #Relacionamento", author: "@confianca_rh", likes: 780, retweets: 145, comments: 54 },
        { id: 10, text: "Líderes que se preocupam com o crescimento pessoal da equipe são os mais respeitados. #Crescimento #Respeito", author: "@crescimento_rh", likes: 670, retweets: 123, comments: 43 }
      ]
    },
    { 
      id: 2, 
      topic: "Recrutamento e Seleção", 
      tweets: 12850, 
      category: "Recruitment",
      popularTweets: [
        { id: 1, text: "O processo de recrutamento deve ser humanizado. Candidatos são pessoas, não apenas currículos. #Recrutamento #Humanização", author: "@recrutamento_hr", likes: 2100, retweets: 756, comments: 234 },
        { id: 2, text: "A entrevista por competências revela muito mais sobre o candidato do que perguntas tradicionais. #Entrevista #Competências", author: "@entrevista_rh", likes: 1780, retweets: 567, comments: 189 },
        { id: 3, text: "Diversidade no recrutamento não é apenas uma questão social, é uma vantagem competitiva. #Diversidade #Vantagem", author: "@diversidade_br", likes: 1560, retweets: 445, comments: 167 },
        { id: 4, text: "O employer branding é fundamental para atrair os melhores talentos. #EmployerBranding #Atração", author: "@branding_hr", likes: 1340, retweets: 334, comments: 145 },
        { id: 5, text: "A experiência do candidato durante o processo seletivo impacta diretamente na imagem da empresa. #Experiência #Imagem", author: "@experiencia_candidato", likes: 1120, retweets: 289, comments: 123 },
        { id: 6, text: "Recrutamento interno deve ser sempre considerado antes de buscar talentos externos. #RecrutamentoInterno #Talento", author: "@interno_rh", likes: 980, retweets: 234, comments: 98 },
        { id: 7, text: "A tecnologia está revolucionando o processo de recrutamento e seleção. #Tecnologia #Revolução", author: "@tech_rh", likes: 870, retweets: 198, comments: 87 },
        { id: 8, text: "O fit cultural é tão importante quanto as competências técnicas. #FitCultural #Competências", author: "@cultural_rh", likes: 760, retweets: 167, comments: 76 },
        { id: 9, text: "Feedback para candidatos rejeitados é uma prática que demonstra respeito e profissionalismo. #Feedback #Respeito", author: "@feedback_rh", likes: 650, retweets: 145, comments: 65 },
        { id: 10, text: "O onboarding começa no processo de recrutamento. #Onboarding #Processo", author: "@onboarding_hr", likes: 540, retweets: 123, comments: 54 }
      ]
    },
    { 
      id: 3, 
      topic: "Cultura Organizacional", 
      tweets: 11230, 
      category: "Culture",
      popularTweets: [
        { id: 1, text: "A cultura organizacional é o DNA da empresa. Ela define como as pessoas se comportam quando ninguém está olhando. #Cultura #DNA", author: "@cultura_org", likes: 1980, retweets: 678, comments: 234 },
        { id: 2, text: "Valores bem definidos e praticados são a base de uma cultura forte. #Valores #Base", author: "@valores_empresa", likes: 1670, retweets: 545, comments: 189 },
        { id: 3, text: "A cultura não pode ser imposta, ela deve ser construída coletivamente. #Construção #Coletiva", author: "@construcao_cultura", likes: 1450, retweets: 423, comments: 156 },
        { id: 4, text: "Transparência e comunicação aberta são pilares de uma cultura saudável. #Transparência #Pilares", author: "@transparencia_rh", likes: 1230, retweets: 345, comments: 134 },
        { id: 5, text: "A cultura organizacional impacta diretamente na retenção de talentos. #Retenção #Impacto", author: "@retencao_talentos", likes: 1120, retweets: 298, comments: 123 },
        { id: 6, text: "Celebrar conquistas e reconhecer esforços fortalece a cultura da empresa. #Celebração #Reconhecimento", author: "@celebracao_rh", likes: 980, retweets: 267, comments: 98 },
        { id: 7, text: "A cultura deve ser vivenciada por todos, desde o CEO até o estagiário. #Vivencia #Todos", author: "@vivencia_cultura", likes: 870, retweets: 234, comments: 87 },
        { id: 8, text: "Feedback constante ajuda a manter a cultura alinhada com os objetivos. #Feedback #Alinhamento", author: "@feedback_cultura", likes: 760, retweets: 198, comments: 76 },
        { id: 9, text: "A cultura organizacional evolui com o tempo e deve ser adaptada às mudanças. #Evolução #Adaptação", author: "@evolucao_cultura", likes: 650, retweets: 167, comments: 65 },
        { id: 10, text: "Uma cultura forte atrai e retém os melhores talentos do mercado. #Atração #Retenção", author: "@cultura_talentos", likes: 540, retweets: 145, comments: 54 }
      ]
    },
    { 
      id: 4, 
      topic: "Desenvolvimento de Talentos", 
      tweets: 9870, 
      category: "Development",
      popularTweets: [
        { id: 1, text: "Investir no desenvolvimento de talentos é investir no futuro da empresa. #Desenvolvimento #Futuro", author: "@desenvolvimento_hr", likes: 1870, retweets: 567, comments: 198 },
        { id: 2, text: "O aprendizado contínuo é essencial para manter a competitividade no mercado. #Aprendizado #Competitividade", author: "@aprendizado_rh", likes: 1560, retweets: 445, comments: 167 },
        { id: 3, text: "Mentoria é uma ferramenta poderosa para o desenvolvimento de carreira. #Mentoria #Carreira", author: "@mentoria_br", likes: 1340, retweets: 334, comments: 145 },
        { id: 4, text: "Programas de treinamento personalizados geram melhores resultados. #Treinamento #Personalizado", author: "@treinamento_hr", likes: 1120, retweets: 289, comments: 123 },
        { id: 5, text: "O desenvolvimento de competências deve ser alinhado aos objetivos da empresa. #Competências #Alinhamento", author: "@competencias_rh", likes: 980, retweets: 234, comments: 98 },
        { id: 6, text: "Feedback 360 graus é fundamental para o desenvolvimento profissional. #Feedback360 #Desenvolvimento", author: "@feedback360_hr", likes: 870, retweets: 198, comments: 87 },
        { id: 7, text: "A gamificação pode tornar o desenvolvimento mais engajante e eficaz. #Gamificação #Engajamento", author: "@gamificacao_rh", likes: 760, retweets: 167, comments: 76 },
        { id: 8, text: "O desenvolvimento de lideranças deve começar cedo na carreira. #Liderança #Carreira", author: "@lideranca_dev", likes: 650, retweets: 145, comments: 65 },
        { id: 9, text: "A tecnologia está transformando a forma como desenvolvemos talentos. #Tecnologia #Transformação", author: "@tech_desenvolvimento", likes: 540, retweets: 123, comments: 54 },
        { id: 10, text: "O desenvolvimento deve ser contínuo e adaptado às necessidades individuais. #Contínuo #Individual", author: "@continuo_rh", likes: 430, retweets: 98, comments: 43 }
      ]
    },
    { 
      id: 5, 
      topic: "Benefícios e Remuneração", 
      tweets: 8650, 
      category: "Compensation",
      popularTweets: [
        { id: 1, text: "A remuneração justa é fundamental para atrair e reter talentos. #Remuneração #Justiça", author: "@remuneracao_hr", likes: 1650, retweets: 456, comments: 178 },
        { id: 2, text: "Benefícios flexíveis são cada vez mais valorizados pelos colaboradores. #Benefícios #Flexibilidade", author: "@beneficios_hr", likes: 1430, retweets: 378, comments: 145 },
        { id: 3, text: "A transparência salarial contribui para a equidade e confiança. #Transparência #Equidade", author: "@transparencia_salario", likes: 1210, retweets: 298, comments: 123 },
        { id: 4, text: "Programas de participação nos lucros motivam e engajam a equipe. #PLR #Motivação", author: "@plr_hr", likes: 990, retweets: 234, comments: 98 },
        { id: 5, text: "A remuneração deve refletir o valor agregado pelo colaborador. #Valor #Reflexão", author: "@valor_colaborador", likes: 870, retweets: 198, comments: 87 },
        { id: 6, text: "Benefícios de saúde e bem-estar são investimentos que geram retorno. #Saúde #Investimento", author: "@saude_beneficios", likes: 760, retweets: 167, comments: 76 },
        { id: 7, text: "A flexibilidade de horários é um benefício altamente valorizado. #Flexibilidade #Horários", author: "@flexibilidade_hr", likes: 650, retweets: 145, comments: 65 },
        { id: 8, text: "Programas de previdência privada demonstram preocupação com o futuro. #Previdência #Futuro", author: "@previdencia_hr", likes: 540, retweets: 123, comments: 54 },
        { id: 9, text: "A remuneração variável alinha interesses da empresa e colaborador. #Variável #Alinhamento", author: "@variavel_hr", likes: 430, retweets: 98, comments: 43 },
        { id: 10, text: "Benefícios personalizados atendem às diferentes necessidades da equipe. #Personalizado #Necessidades", author: "@personalizado_hr", likes: 320, retweets: 76, comments: 32 }
      ]
    }
  ];

  const handleLogin = async (username, password) => {
    if (username === 'hr4all' && password === 'hr4allonx') {
      setIsAuthenticated(true);
      setLoading(true);
      
      try {
        // Fetch real-time data from Grok
        const data = await grokService.searchTrendingHRTopics();
        setTrendingTopics(data.topics || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data if API fails
        setTrendingTopics(mockTrendingTopics);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Credenciais inválidas! Use: hr4all / hr4allonx');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setTrendingTopics([]);
  };

  return (
    <AppContainer>
      <Header>
        <Logo>
          <FaTwitter style={{ color: '#1DA1F2' }} />
          HR on X
        </Logo>
        <Subtitle>Top 20 Trending HR Topics in Brazil</Subtitle>
      </Header>

      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <TrendingTopics 
          topics={trendingTopics} 
          loading={loading}
          onLogout={handleLogout}
        />
      )}
    </AppContainer>
  );
}

export default App;
