import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from '../components/FeedbackForm';

describe('FeedbackForm', () => {
  it('Проверка заголовка', () => {
    render(<FeedbackForm />);
    expect(screen.getByText(/feedback form/i)).toBeInTheDocument();
  });

  it('Ввод имени и сообщения', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rinat' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } });

    expect(screen.getByDisplayValue('Rinat')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('Отправка формы с валидными данными', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rinat' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Feedback sent!');
  });

  it('Сообщение не отправляется при пустом вводе', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('Кнопка существует и активна', () => {
    render(<FeedbackForm />);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled(); 
  });

  it('trim-валидация: ввод только пробелов не проходит', () => {
    render(<FeedbackForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: '   ' } });

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();
  });
});
