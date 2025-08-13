# HR on X - Trending HR Topics Brazil

A beautiful React application that displays the top 20 trending HR (Human Resources) topics in Brazil from X (Twitter). The application features password protection and a modern, responsive design.

## Features

- 🔐 **Password Protection**: Secure login system
- 📊 **Top 20 Trending Topics**: Curated HR topics trending in Brazil
- 🎨 **Beautiful UI**: Modern, responsive design with animations
- 📱 **Mobile Friendly**: Optimized for all device sizes
- 🔍 **Category Filtering**: Filter topics by different HR categories
- 📈 **Statistics Dashboard**: Overview of trending data
- 🇧🇷 **Portuguese Interface**: Localized for Brazilian users

## Login Credentials

- **Username**: `hr4all`
- **Password**: `hr4allonx`

## Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Trending Topics Included

The application displays 20 trending HR topics in Portuguese:

1. **Gestão de Pessoas** - People Management
2. **Recrutamento e Seleção** - Recruitment and Selection
3. **Cultura Organizacional** - Organizational Culture
4. **Desenvolvimento de Talentos** - Talent Development
5. **Benefícios e Remuneração** - Benefits and Compensation
6. **Engajamento de Funcionários** - Employee Engagement
7. **Diversidade e Inclusão** - Diversity and Inclusion
8. **Trabalho Remoto** - Remote Work
9. **Saúde Mental no Trabalho** - Mental Health at Work
10. **Transformação Digital RH** - Digital HR Transformation
11. **Compliance Trabalhista** - Labor Compliance
12. **Avaliação de Performance** - Performance Evaluation
13. **Plano de Carreira** - Career Planning
14. **Onboarding** - Employee Onboarding
15. **Gestão de Conflitos** - Conflict Management
16. **Tecnologia RH** - HR Technology
17. **Sustentabilidade Corporativa** - Corporate Sustainability
18. **Inovação em RH** - HR Innovation
19. **Gestão de Mudanças** - Change Management
20. **Liderança Feminina** - Female Leadership

## Technologies Used

- **React 18** - Frontend framework
- **Styled Components** - CSS-in-JS styling
- **React Icons** - Icon library
- **Create React App** - Build tool

## Project Structure

```
src/
├── components/
│   ├── LoginForm.js          # Authentication component
│   └── TrendingTopics.js     # Main content display
├── App.js                    # Main application component
├── App.css                   # Additional styles
├── index.js                  # Application entry point
└── index.css                 # Global styles

public/
├── index.html               # HTML template
├── manifest.json            # Web app manifest
└── favicon.svg              # Application icon
```

## Features in Detail

### Authentication System
- Secure login with username/password
- Password visibility toggle
- Loading states and error handling
- Session management

### Trending Topics Display
- Grid layout with responsive design
- Topic ranking with visual indicators
- Tweet count statistics
- Category-based filtering
- Hover animations and effects

### Statistics Dashboard
- Total topics count
- Total tweets across all topics
- Average tweets per topic
- Country indicator

### Category Filtering
- Filter by 20 different HR categories
- Real-time filtering
- Visual feedback for active filters

## Customization

### Adding New Topics
Edit the `mockTrendingTopics` array in `src/App.js`:

```javascript
const mockTrendingTopics = [
  { id: 21, topic: "Novo Tópico", tweets: 1000, category: "New Category" },
  // ... existing topics
];
```

### Styling Changes
- Main styles are in `src/index.css`
- Component-specific styles use styled-components
- Color scheme can be modified in the styled components

### Authentication
- Change credentials in `src/App.js` in the `handleLogin` function
- For production, implement proper backend authentication

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- Optimized for fast loading
- Lazy loading of components
- Efficient re-rendering
- Responsive design for all screen sizes

## Security Notes

- This is a demo application with frontend-only authentication
- For production use, implement proper backend security
- Consider adding HTTPS and additional security measures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational and demonstration purposes.

---

**Note**: This application uses mock data for demonstration. In a real-world scenario, you would integrate with actual X (Twitter) API or other social media APIs to fetch real trending data.
