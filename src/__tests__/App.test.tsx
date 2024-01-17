import '@testing-library/jest-dom';

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

  // eslint-disable-next-line jest/expect-expect
  it('should render', () => {});
});
