/** @vitest-environment jsdom */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TaskModal from './TaskModal';
import React from 'react';

describe('TaskModal Validation', () => {
  it('shows error highlight on empty required fields', async () => {
    render(
      <Provider store={store}>
        <TaskModal isOpen={true} onClose={() => {}} initialEditMode={true} />
      </Provider>
    );

    const submitBtn = screen.getByText(/Create Task/i);
    fireEvent.click(submitBtn);

    const inputs = screen.getAllByRole('textbox');
    const titleInput = inputs[0]; 
    
    expect(titleInput.className).toContain('inputError');
  });
});