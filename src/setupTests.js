// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Modal from 'react-modal';

// Mock setAppElement to avoid errors in the test environment
if (process.env.NODE_ENV === 'test') {
    Modal.setAppElement = () => null;
}

