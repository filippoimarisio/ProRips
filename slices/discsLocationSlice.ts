import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DiscLocation} from '../types/types'

const initialState: DiscLocation[] = []

export const discsLocationSlice = createSlice({
  name: 'discsLocation',
  initialState,
  reducers: {
    addDiscLocation: (state, action: PayloadAction<DiscLocation>) => {
      return state = [...state, action.payload]
    }
  }
})

export const { addDiscLocation } = discsLocationSlice.actions

export default discsLocationSlice.reducer