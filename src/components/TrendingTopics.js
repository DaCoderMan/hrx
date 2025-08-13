import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTwitter, FaSignOutAlt, FaFire, FaFilter, FaHeart, FaRetweet, FaComment, FaShare } from 'react-icons/fa';
import grokService from '../services/grokService';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.6s ease-out;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(255, 71, 87, 0.4);
    background: linear-gradient(135deg, #ff5e6c 0%, #ff4a55 100%);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(0, 102, 255, 0.2) 100%);
  color: white;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, rgba(0, 102, 255, 0.3) 100%);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  border: 2px solid ${props => props.active ? '#00d4ff' : 'rgba(255, 255, 255, 0.3)'};
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #00e6ff 0%, #0077ff 100%)' : 'rgba(255, 255, 255, 0.2)'};
    border-color: #00d4ff;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 212, 255, 0.3);
  }
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TopicCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border-left: 4px solid #00d4ff;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
    border-left: 4px solid #00e6ff;
  }
`;

const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const TopicTitle = styled.h3`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TopicRank = styled.div`
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  margin-left: 12px;
  box-shadow: 0 4px 8px rgba(0, 212, 255, 0.3);
`;

const TopicStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TweetCount = styled.div`
  color: #00d4ff;
  font-weight: 700;
  font-size: 1.4rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Category = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #00d4ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-right: 15px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;



const TweetsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const TweetsContainer = styled.div`
  background: rgba(15, 15, 35, 0.95);
  border-radius: 24px;
  padding: 40px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: fadeIn 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(255, 71, 87, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ff5e6c 0%, #ff4a55 100%);
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(255, 71, 87, 0.4);
  }
`;

const TweetCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #00d4ff;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const TweetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TweetAuthor = styled.div`
  font-weight: 700;
  color: #00d4ff;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TweetRank = styled.div`
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 212, 255, 0.3);
`;

const TweetText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TweetStats = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const TweetStat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const TrendingTopics = ({ topics, loading, onLogout }) => {
  const [filter, setFilter] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [tweetsLoading, setTweetsLoading] = useState(false);
  const [tweetsData, setTweetsData] = useState({});

  const categories = ['all', 'Leadership', 'Recruitment', 'Culture', 'Development', 'Compensation', 'Engagement', 'Diversity', 'Remote Work', 'Wellness', 'Digital', 'Compliance', 'Performance', 'Career', 'Onboarding', 'Conflict', 'HR Tech', 'Sustainability', 'Innovation', 'Change'];

  const filteredTopics = filter === 'all' 
    ? topics 
    : topics.filter(topic => topic.category === filter);

  const totalTweets = topics.reduce((sum, topic) => sum + topic.tweets, 0);
  const avgTweets = Math.round(totalTweets / topics.length);

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setTweetsLoading(true);
    
    try {
      // Check if we already have tweets for this topic
      if (!tweetsData[topic.topic]) {
        const response = await grokService.searchTweetsForTopic(topic.topic);
        setTweetsData(prev => ({
          ...prev,
          [topic.topic]: response.tweets || []
        }));
      }
    } catch (error) {
      console.error('Error fetching tweets:', error);
      // Use fallback data if API fails
      const fallbackResponse = grokService.getFallbackTweetsForTopic(topic.topic);
      setTweetsData(prev => ({
        ...prev,
        [topic.topic]: fallbackResponse.tweets || []
      }));
    } finally {
      setTweetsLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <Spinner />
          Carregando trending topics...
        </LoadingSpinner>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Title>
            <FaFire style={{ color: '#ff6b6b' }} />
            Trending Topics
          </Title>
          <LogoutButton onClick={onLogout}>
            <FaSignOutAlt />
            Sair
          </LogoutButton>
        </Header>

        <Stats>
          <StatCard>
            <StatNumber>{topics.length}</StatNumber>
            <StatLabel>Total de Topics</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{totalTweets.toLocaleString()}</StatNumber>
            <StatLabel>Total de Tweets</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{avgTweets.toLocaleString()}</StatNumber>
            <StatLabel>Média por Topic</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>🇧🇷</StatNumber>
            <StatLabel>Brasil</StatLabel>
          </StatCard>
        </Stats>

        <FilterBar>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)' }}>
             <FaFilter />
             <span>Filtrar por categoria:</span>
           </div>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === 'all' ? 'Todas' : category}
            </FilterButton>
          ))}
        </FilterBar>

        <TopicsGrid>
          {filteredTopics.map((topic, index) => (
                         <TopicCard 
               key={topic.id}
               onClick={() => handleTopicClick(topic)}
             >
              <TopicHeader>
                <TopicTitle>{topic.topic}</TopicTitle>
                <TopicRank>{topic.id}</TopicRank>
              </TopicHeader>
              <TopicStats>
                <TweetCount>
                  <FaTwitter style={{ marginRight: '5px' }} />
                  {topic.tweets.toLocaleString()}
                </TweetCount>
                <Category>{topic.category}</Category>
              </TopicStats>
            </TopicCard>
          ))}
        </TopicsGrid>
      </Container>

      {selectedTopic && (
        <TweetsModal onClick={() => setSelectedTopic(null)}>
          <TweetsContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedTopic(null)}>×</CloseButton>
            <ModalTitle>
              <FaTwitter style={{ color: '#1DA1F2', marginRight: '10px' }} />
              Top 10 Tweets - {selectedTopic.topic}
            </ModalTitle>
            
                         {tweetsLoading ? (
               <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
                 <Spinner />
                 Carregando tweets...
               </div>
             ) : tweetsData[selectedTopic.topic] && tweetsData[selectedTopic.topic].length > 0 ? (
               tweetsData[selectedTopic.topic].map((tweet, index) => (
                <TweetCard key={tweet.id}>
                  <TweetHeader>
                    <TweetAuthor>{tweet.author}</TweetAuthor>
                    <TweetRank>{index + 1}</TweetRank>
                  </TweetHeader>
                  <TweetText>{tweet.text}</TweetText>
                  <TweetStats>
                    <TweetStat>
                      <FaHeart style={{ color: '#e74c3c' }} />
                      {tweet.likes.toLocaleString()}
                    </TweetStat>
                    <TweetStat>
                      <FaRetweet style={{ color: '#27ae60' }} />
                      {tweet.retweets.toLocaleString()}
                    </TweetStat>
                    <TweetStat>
                      <FaComment style={{ color: '#3498db' }} />
                      {tweet.comments.toLocaleString()}
                    </TweetStat>
                  </TweetStats>
                </TweetCard>
              ))
                         ) : (
               <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', padding: '20px' }}>
                 Nenhum tweet disponível para este tópico.
               </div>
             )}
          </TweetsContainer>
        </TweetsModal>
      )}
    </>
  );
};

export default TrendingTopics;
