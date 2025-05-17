
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/animation.css'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
