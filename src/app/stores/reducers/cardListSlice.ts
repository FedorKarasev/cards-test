import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../interfaces/ICard';

const initialState = {
  isLoading: false,
  cards: [] as ICard[],
  error: '',
};

export const fetchCards = createAsyncThunk('card/fetchCards', async (limit: number = 10) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}`);
  let cards = await res.json();
  cards = cards.map((card: ICard) => {
    return { ...card, like: false };
  });

  return cards;
});

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    likeCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload) {
          return { ...card, like: !card.like };
        }
        return card;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = action.payload;
      state.error = '';
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || '';
    });
  },
});

export const { removeCard, likeCard } = cardSlice.actions;

export default cardSlice.reducer;
