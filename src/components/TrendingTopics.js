import React, { useState } from 'react';
import { FaComment, FaFire, FaHeart, FaRetweet, FaSignOutAlt, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import grokService from '../services/grokService';

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
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
  font-size: 3.5rem;
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
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 16px;
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
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 1.3rem;
  opacity: 0.9;
`;

const TopicCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border-left: 4px solid #00d4ff;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;

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
  margin-bottom: 20px;
`;

const TopicTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TopicRank = styled.div`
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin-left: 12px;
  box-shadow: 0 4px 8px rgba(0, 212, 255, 0.3);
`;

const TopicStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TweetCount = styled.div`
  color: #00d4ff;
  font-weight: 700;
  font-size: 2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const Category = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TweetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TweetCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
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
  margin-bottom: 15px;
`;

const TweetAuthor = styled.div`
  font-weight: 700;
  color: #00d4ff;
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TweetRank = styled.div`
  background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 212, 255, 0.3);
`;

const TweetText = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const TweetStats = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const TweetStat = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.6rem;
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

const TrendingTopics = ({ topics, loading, onLogout }) => {
  const [tweetsLoading, setTweetsLoading] = useState(false);
  const [tweetsData, setTweetsData] = useState({});

  const handleTopicClick = async (topic) => {
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
          <StatNumber>{topics.reduce((sum, topic) => sum + topic.tweets, 0).toLocaleString()}</StatNumber>
          <StatLabel>Total de Tweets</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>30</StatNumber>
          <StatLabel>Tweets por Topic</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>🇧🇷</StatNumber>
          <StatLabel>Brasil</StatLabel>
        </StatCard>
      </Stats>

      {topics.map((topic) => (
        <TopicCard key={topic.id}>
          <TopicHeader>
            <TopicTitle>{topic.topic}</TopicTitle>
            <TopicRank>{topic.id}</TopicRank>
          </TopicHeader>
          <TopicStats>
            <TweetCount>
              <FaTwitter style={{ marginRight: '8px' }} />
              {topic.tweets.toLocaleString()}
            </TweetCount>
            <Category>{topic.category}</Category>
          </TopicStats>

          {tweetsLoading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)', padding: '20px' }}>
              <Spinner />
              Carregando tweets...
            </div>
          ) : (
            <TweetsGrid>
              {topic.popularTweets && topic.popularTweets.map((tweet, index) => (
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
              ))}
            </TweetsGrid>
          )}
        </TopicCard>
      ))}
    </Container>
  );
};

export default TrendingTopics;
