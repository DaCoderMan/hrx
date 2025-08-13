import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTwitter, FaSignOutAlt, FaFire, FaFilter, FaHeart, FaRetweet, FaComment, FaShare } from 'react-icons/fa';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
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
  background: ${props => props.active ? '#1DA1F2' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 2px solid ${props => props.active ? '#1DA1F2' : '#e1e5e9'};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#1DA1F2' : '#f8f9fa'};
    border-color: #1DA1F2;
  }
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TopicCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #1DA1F2;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const TopicTitle = styled.h3`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
`;

const TopicRank = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  margin-left: 10px;
`;

const TopicStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TweetCount = styled.div`
  color: #1DA1F2;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Category = styled.span`
  background: #f8f9fa;
  color: #666;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1DA1F2;
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
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: fadeIn 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff6b6b;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ee5a52;
  }
`;

const TweetCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  border-left: 3px solid #1DA1F2;
`;

const TweetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TweetAuthor = styled.div`
  font-weight: 600;
  color: #1DA1F2;
  font-size: 14px;
`;

const TweetRank = styled.div`
  background: #ff6b6b;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

const TweetText = styled.div`
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const TweetStats = styled.div`
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #666;
`;

const TweetStat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ModalTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5rem;
`;

const TrendingTopics = ({ topics, loading, onLogout }) => {
  const [filter, setFilter] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = ['all', 'Leadership', 'Recruitment', 'Culture', 'Development', 'Compensation', 'Engagement', 'Diversity', 'Remote Work', 'Wellness', 'Digital', 'Compliance', 'Performance', 'Career', 'Onboarding', 'Conflict', 'HR Tech', 'Sustainability', 'Innovation', 'Change'];

  const filteredTopics = filter === 'all' 
    ? topics 
    : topics.filter(topic => topic.category === filter);

  const totalTweets = topics.reduce((sum, topic) => sum + topic.tweets, 0);
  const avgTweets = Math.round(totalTweets / topics.length);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}>
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
              onClick={() => setSelectedTopic(topic)}
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
            
            {selectedTopic.popularTweets && selectedTopic.popularTweets.length > 0 ? (
              selectedTopic.popularTweets.map((tweet, index) => (
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
              <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
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
