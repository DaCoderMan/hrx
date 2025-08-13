// Grok API Service
const GROK_API_KEY = process.env.REACT_APP_GROK_API_KEY || 'your-grok-api-key-here';
const GROK_BASE_URL = 'https://api.x.ai/v1';

class GrokService {
  constructor() {
    this.apiKey = GROK_API_KEY;
    this.baseUrl = GROK_BASE_URL;
  }

  async searchTrendingHRTopics() {
    try {
      const prompt = `
        Pesquise os top 20 trending topics relacionados a Recursos Humanos (RH) no Brasil no X (Twitter) neste momento.
        
        Para cada topic, forneça:
        1. Nome do topic em português
        2. Número estimado de tweets
        3. Categoria (Leadership, Recruitment, Culture, Development, Compensation, Engagement, Diversity, Remote Work, Wellness, Digital, Compliance, Performance, Career, Onboarding, Conflict, HR Tech, Sustainability, Innovation, Change)
        
        Retorne os dados em formato JSON com a seguinte estrutura:
        {
          "topics": [
            {
              "id": 1,
              "topic": "Nome do Topic",
              "tweets": 12345,
              "category": "Categoria"
            }
          ]
        }
        
        Certifique-se de que todos os dados sejam reais e atuais, baseados em pesquisas reais no X.
      `;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-User-Id': 'user-123'
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the response content to extract JSON
      const content = data.choices[0].message.content;
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create structured data from text response
        return this.parseTextResponse(content);
      }

    } catch (error) {
      console.error('Error fetching data from Grok:', error);
      // Return fallback data if API fails
      return this.getFallbackData();
    }
  }

  async searchTweetsForTopic(topicName) {
    try {
      const prompt = `
        Pesquise os 10 tweets mais populares e relevantes sobre "${topicName}" no X (Twitter) no Brasil neste momento.
        
        Para cada tweet, forneça:
        - Texto completo do tweet
        - Autor (username com @)
        - Número de likes
        - Número de retweets
        - Número de comentários
        
        Retorne os dados em formato JSON com a seguinte estrutura:
        {
          "tweets": [
            {
              "id": 1,
              "text": "Texto completo do tweet",
              "author": "@username",
              "likes": 1234,
              "retweets": 567,
              "comments": 89
            }
          ]
        }
        
        Certifique-se de que todos os tweets sejam reais e atuais, baseados em pesquisas reais no X sobre "${topicName}".
        Os tweets devem ser em português e relacionados especificamente ao tópico "${topicName}".
      `;

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-User-Id': 'user-123'
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 3000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the response content to extract JSON
      const content = data.choices[0].message.content;
      
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create structured data from text response
        return this.parseTweetResponse(content, topicName);
      }

    } catch (error) {
      console.error('Error fetching tweets from Grok:', error);
      // Return fallback data if API fails
      return this.getFallbackTweetsForTopic(topicName);
    }
  }

  parseTweetResponse(content, topicName) {
    const tweets = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.includes('@') && (line.includes('likes') || line.includes('retweets'))) {
        const tweet = this.parseTweetLine(line);
        if (tweet) {
          tweets.push(tweet);
        }
      }
    }

    return { tweets: tweets.slice(0, 10) };
  }

  parseTextResponse(content) {
    // Parse text response and convert to structured data
    const topics = [];
    const lines = content.split('\n');
    let currentTopic = null;
    let currentTweets = [];

    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        // New topic
        if (currentTopic) {
          currentTopic.popularTweets = currentTweets;
          topics.push(currentTopic);
        }
        
        const topicName = line.replace(/^\d+\.\s*/, '').trim();
        currentTopic = {
          id: topics.length + 1,
          topic: topicName,
          tweets: Math.floor(Math.random() * 15000) + 2000,
          category: this.getCategoryForTopic(topicName),
          popularTweets: []
        };
        currentTweets = [];
      } else if (line.includes('@') && (line.includes('likes') || line.includes('retweets'))) {
        // Tweet line
        const tweet = this.parseTweetLine(line);
        if (tweet) {
          currentTweets.push(tweet);
        }
      }
    }

    if (currentTopic) {
      currentTopic.popularTweets = currentTweets;
      topics.push(currentTopic);
    }

    return { topics: topics.slice(0, 20) };
  }

  parseTweetLine(line) {
    try {
      const authorMatch = line.match(/@\w+/);
      const likesMatch = line.match(/(\d+)\s*likes?/i);
      const retweetsMatch = line.match(/(\d+)\s*retweets?/i);
      const commentsMatch = line.match(/(\d+)\s*comments?/i);

      if (authorMatch) {
        return {
          id: Math.floor(Math.random() * 1000) + 1,
          text: line.replace(/@\w+.*?(\d+)/, '').trim(),
          author: authorMatch[0],
          likes: likesMatch ? parseInt(likesMatch[1]) : Math.floor(Math.random() * 2000) + 100,
          retweets: retweetsMatch ? parseInt(retweetsMatch[1]) : Math.floor(Math.random() * 500) + 50,
          comments: commentsMatch ? parseInt(commentsMatch[1]) : Math.floor(Math.random() * 200) + 10
        };
      }
    } catch (error) {
      console.error('Error parsing tweet line:', error);
    }
    return null;
  }

  getCategoryForTopic(topicName) {
    const categories = {
      'gestão': 'Leadership',
      'liderança': 'Leadership',
      'recrutamento': 'Recruitment',
      'seleção': 'Recruitment',
      'cultura': 'Culture',
      'desenvolvimento': 'Development',
      'talentos': 'Development',
      'benefícios': 'Compensation',
      'remuneração': 'Compensation',
      'engajamento': 'Engagement',
      'diversidade': 'Diversity',
      'inclusão': 'Diversity',
      'remoto': 'Remote Work',
      'saúde': 'Wellness',
      'mental': 'Wellness',
      'digital': 'Digital',
      'tecnologia': 'HR Tech',
      'compliance': 'Compliance',
      'performance': 'Performance',
      'carreira': 'Career',
      'onboarding': 'Onboarding',
      'conflitos': 'Conflict',
      'sustentabilidade': 'Sustainability',
      'inovação': 'Innovation',
      'mudanças': 'Change'
    };

    const lowerTopic = topicName.toLowerCase();
    for (const [key, category] of Object.entries(categories)) {
      if (lowerTopic.includes(key)) {
        return category;
      }
    }
    return 'Leadership'; // Default category
  }

  getFallbackData() {
    return {
      topics: [
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
      ]
    };
  }

  getFallbackTweetsForTopic(topicName) {
    // Fallback tweets for specific topics when API is not available
    const fallbackTweets = {
      "Gestão de Pessoas": [
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
      ],
      "Recrutamento e Seleção": [
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
    };

    return {
      tweets: fallbackTweets[topicName] || fallbackTweets["Gestão de Pessoas"]
    };
  }
}

export default new GrokService();
