/** @vitest-environment jsdom */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import TaskRow from './TaskRow';

describe('TaskRow Display', () => {
  const mockTask = {
    id: 1,
    title: 'Test the app functionality',
    description: 'Detailed description',
    status: 'New',
    priority: 'High',
    dueDate: '2023-12-31'
  };

  it('renders task details correctly in the table', () => {
    render(
      <table>
        <tbody>
          <TaskRow task={mockTask} onEdit={() => {}} onDelete={() => {}} />
        </tbody>
      </table>
    );

    expect(screen.getByText('Test the app functionality')).toBeDefined();
    expect(screen.getByText('High')).toBeDefined();
  });
});