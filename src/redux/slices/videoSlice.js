import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async countryCode => {
    const response = await fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=' +
        countryCode +
        '&key=AIzaSyBz3ykF5aZpK2UTxXCiTYTyGcrf443ALAk',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return await response.json();
  },
);

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState: {
    videos: null,
    loading: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVideos.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchVideos.rejected, state => {
      state.loading = false;
    });
  },
});

export const selectVideos = state => state.activitiesSlice.news;
export default videoSlice.reducer;
