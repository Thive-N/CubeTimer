import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import App from '../renderer/App';

describe('App', () => {
  beforeEach(() => {
    window.electron = {
      ipcRenderer: {
        on: jest.fn(),
        sendMessage: jest.fn(),
        once: jest.fn(),
      },
    };
  });

  it('should render', () => {
    expect(
      render(
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>,
      ),
    ).toBeTruthy();
  });
});
