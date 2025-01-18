
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ListProvider } from './Components/ContextAPI/ListContext.jsx';

createRoot(document.getElementById('root')).render(

    <ListProvider>
      <App />
    </ListProvider>

);
