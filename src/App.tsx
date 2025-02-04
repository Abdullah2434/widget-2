import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TicketSelectionScreen } from './screen/TicketSelectionScreen';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TicketSelectionScreen />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
