import { describe, it, expect } from 'vitest';
import tasksReducer, { setSelectedTask, clearSelectedTask } from './tasksSlice';

describe('tasks reducer', () => {
  const initialState = {
    list: [],
    selectedTask: null,
    isLoading: false,
    error: null
  };

  it('should handle setSelectedTask', () => {
    const mockTask = { id: 1, title: 'Test Task' };
    const state = tasksReducer(initialState, setSelectedTask(mockTask));
    expect(state.selectedTask).toEqual(mockTask);
  });

  it('should handle clearSelectedTask', () => {
    const stateWithTask = { ...initialState, selectedTask: { id: 1 } };
    const state = tasksReducer(stateWithTask, clearSelectedTask());
    expect(state.selectedTask).toBeNull();
  });
});