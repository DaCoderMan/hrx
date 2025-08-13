import React, { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import './App.css';
import LoginForm from './components/LoginForm';
import TrendingTopics from './components/TrendingTopics';
import grokService from './services/grokService';

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
  gap: 12px;
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 12px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 500;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // Single HR topic with top 30 tweets
  const mockTrendingTopics = [
    {
      id: 1,
      topic: "Recursos Humanos no Brasil",
      tweets: 45000,
      category: "HR",
      popularTweets: [
        { id: 1, text: "A transformação digital está revolucionando o RH. Empresas que não se adaptarem ficarão para trás. #RH #TransformacaoDigital #Brasil", author: "@hr_expert_br", likes: 3450, retweets: 1234, comments: 567 },
        { id: 2, text: "O bem-estar dos colaboradores nunca foi tão importante. Empresas que investem em saúde mental têm 3x menos turnover. #BemEstar #RH #SaudeMental", author: "@rh_brasil", likes: 2980, retweets: 987, comments: 456 },
        { id: 3, text: "Diversidade e inclusão não são apenas moda, são estratégia de negócio. Empresas diversas são 35% mais lucrativas. #Diversidade #Inclusao #RH", author: "@diversidade_hr", likes: 2670, retweets: 876, comments: 345 },
        { id: 4, text: "O futuro do trabalho é híbrido. Empresas que oferecem flexibilidade atraem os melhores talentos. #TrabalhoHibrido #FuturoDoTrabalho #RH", author: "@futuro_trabalho", likes: 2340, retweets: 765, comments: 234 },
        { id: 5, text: "Recrutamento por competências é o novo padrão. Experiência não é tudo, potencial é fundamental. #Recrutamento #Competencias #RH", author: "@recrutamento_br", likes: 2120, retweets: 654, comments: 198 },
        { id: 6, text: "A cultura organizacional é o DNA da empresa. Ela define como as pessoas se comportam quando ninguém está olhando. #Cultura #Organizacional #RH", author: "@cultura_empresa", likes: 1980, retweets: 543, comments: 167 },
        { id: 7, text: "Desenvolvimento de lideranças deve começar cedo. Líderes não nascem, são formados. #Lideranca #Desenvolvimento #RH", author: "@lideranca_dev", likes: 1870, retweets: 432, comments: 145 },
        { id: 8, text: "Feedback contínuo é melhor que avaliação anual. Colaboradores precisam de orientação constante. #Feedback #Avaliacao #RH", author: "@feedback_hr", likes: 1760, retweets: 398, comments: 134 },
        { id: 9, text: "A remuneração justa é fundamental, mas o reconhecimento vai além do salário. #Remuneracao #Reconhecimento #RH", author: "@remuneracao_br", likes: 1650, retweets: 365, comments: 123 },
        { id: 10, text: "O onboarding bem feito reduz turnover em 50%. Primeira impressão é a que fica. #Onboarding #Retencao #RH", author: "@onboarding_hr", likes: 1540, retweets: 334, comments: 112 },
        { id: 11, text: "A tecnologia está democratizando o RH. Ferramentas acessíveis para empresas de todos os tamanhos. #Tecnologia #RH #Inovacao", author: "@tech_rh", likes: 1430, retweets: 312, comments: 101 },
        { id: 12, text: "O employer branding é fundamental para atrair talentos. Sua empresa é atrativa para os melhores profissionais? #EmployerBranding #RH", author: "@branding_hr", likes: 1320, retweets: 289, comments: 98 },
        { id: 13, text: "A comunicação interna é a base de uma empresa saudável. Informação clara evita boatos e desconfiança. #Comunicacao #Interna #RH", author: "@comunicacao_rh", likes: 1210, retweets: 267, comments: 87 },
        { id: 14, text: "O desenvolvimento de competências deve ser contínuo. O mundo muda rápido, precisamos nos adaptar. #Competencias #Desenvolvimento #RH", author: "@competencias_hr", likes: 1100, retweets: 245, comments: 76 },
        { id: 15, text: "A gestão de performance deve ser baseada em dados, não em impressões. Objetividade é fundamental. #Performance #Gestao #RH", author: "@performance_hr", likes: 990, retweets: 223, comments: 65 },
        { id: 16, text: "O trabalho remoto veio para ficar. Empresas que resistem perdem talentos para concorrentes mais flexíveis. #TrabalhoRemoto #Flexibilidade #RH", author: "@remoto_hr", likes: 880, retweets: 201, comments: 54 },
        { id: 17, text: "A saúde ocupacional é investimento, não custo. Colaboradores saudáveis são mais produtivos. #SaudeOcupacional #RH #Produtividade", author: "@saude_ocupacional", likes: 770, retweets: 178, comments: 43 },
        { id: 18, text: "O planejamento de carreira é responsabilidade compartilhada. Empresa e colaborador devem trabalhar juntos. #Carreira #Planejamento #RH", author: "@carreira_hr", likes: 660, retweets: 156, comments: 32 },
        { id: 19, text: "A gestão de conflitos é habilidade essencial para líderes. Conflitos mal resolvidos destroem equipes. #Conflitos #Gestao #RH", author: "@conflitos_hr", likes: 550, retweets: 134, comments: 21 },
        { id: 20, text: "O compliance trabalhista é fundamental. Empresas que desrespeitam a lei pagam caro no futuro. #Compliance #Trabalhista #RH", author: "@compliance_hr", likes: 440, retweets: 112, comments: 19 },
        { id: 21, text: "A inovação no RH é necessária. Métodos antigos não funcionam mais no mundo atual. #Inovacao #RH #Transformacao", author: "@inovacao_rh", likes: 330, retweets: 89, comments: 17 },
        { id: 22, text: "O employer experience é o novo foco. Experiência do colaborador impacta diretamente nos resultados. #EmployerExperience #RH", author: "@experience_hr", likes: 220, retweets: 67, comments: 15 },
        { id: 23, text: "A gestão de talentos é estratégica. Identificar e desenvolver talentos é diferencial competitivo. #GestaoTalentos #RH", author: "@talentos_hr", likes: 110, retweets: 45, comments: 13 },
        { id: 24, text: "O RH estratégico é parceiro do negócio, não apenas área administrativa. #RH #Estrategico #Negocio", author: "@estrategico_rh", likes: 100, retweets: 34, comments: 11 },
        { id: 25, text: "A transformação cultural é processo contínuo. Não acontece da noite para o dia. #Transformacao #Cultural #RH", author: "@cultural_rh", likes: 90, retweets: 23, comments: 9 },
        { id: 26, text: "O employer value proposition deve ser claro e atrativo. O que sua empresa oferece além do salário? #EVP #RH", author: "@evp_hr", likes: 80, retweets: 19, comments: 7 },
        { id: 27, text: "A gestão de mudanças é essencial. Mudanças mal conduzidas geram resistência e insucesso. #Mudancas #Gestao #RH", author: "@mudancas_hr", likes: 70, retweets: 16, comments: 5 },
        { id: 28, text: "O employer engagement mede o comprometimento dos colaboradores. Engajados são mais produtivos. #Engagement #RH", author: "@engagement_hr", likes: 60, retweets: 13, comments: 3 },
        { id: 29, text: "A sustentabilidade no RH é tendência. Empresas sustentáveis atraem talentos conscientes. #Sustentabilidade #RH", author: "@sustentavel_rh", likes: 50, retweets: 10, comments: 2 },
        { id: 30, text: "O futuro do RH é humanizado e tecnológico. Equilíbrio entre automação e toque humano. #FuturoRH #Tecnologia #Humanizado", author: "@futuro_rh", likes: 40, retweets: 7, comments: 1 }
      ]
    }
  ];

  const handleLogin = async (username, password) => {
    if (username === 'hr4all' && password === 'hr4allonx') {
      setIsAuthenticated(true);
      setLoading(true);

      try {
        // Fetch real-time trending topics from Grok
        const data = await grokService.searchTrendingHRTopics();
        setTrendingTopics(data.topics || []);
      } catch (error) {
        console.error('Error fetching trending topics:', error);
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
        <Subtitle>Top 30 HR Tweets in Brazil</Subtitle>
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
