import { createRoot } from 'react-dom/client';
import { ProSidebarProvider } from 'react-pro-sidebar';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <div>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </div>,
);
