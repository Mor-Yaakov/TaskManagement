import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as tasksApi from '../../api/tasksApi'

// get all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      return await tasksApi.getTasks()
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// create new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task, { rejectWithValue }) => {
    try {
      return await tasksApi.createTask(task)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// update task
export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, task }, { rejectWithValue }) => {
    try {
      const updatedTask = await tasksApi.updateTask(id, task)
      return updatedTask
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// delete task
export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(id)
      return id 
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    selectedTask: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setSelectedTask(state, action) {
      state.selectedTask = action.payload
    },
    clearSelectedTask(state) {
      state.selectedTask = null
    }
  },
  extraReducers: builder => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, state => { state.isLoading = true; state.error = null })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload })
      .addCase(fetchTasks.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })

      // addTask
      .addCase(addTask.pending, state => { state.isLoading = true; state.error = null })
      .addCase(addTask.fulfilled, (state, action) => { state.isLoading = false; state.list.push(action.payload) })
      .addCase(addTask.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })

      // editTask
      .addCase(editTask.pending, state => { state.isLoading = true; state.error = null })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.list.findIndex(task => task.id === action.payload.id)
        if (index !== -1) state.list[index] = action.payload
      })
      .addCase(editTask.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })

      // removeTask
      .addCase(removeTask.pending, state => { state.isLoading = true; state.error = null })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.filter(task => task.id !== action.payload)
      })
      .addCase(removeTask.rejected, (state, action) => { state.isLoading = false; state.error = action.payload })
  }
})

export const { setSelectedTask, clearSelectedTask } = tasksSlice.actions
export default tasksSlice.reducer
