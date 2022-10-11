import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../assets/config/APIs"

export const getMovies = createAsyncThunk("movie/getData", async () => {
  try {
    API.defaults.headers.common["Authorization"] = "Bearer Wookie2019"
    const { data } = await API.get("movies")
    return data.movies
  } catch (error) {
    console.log(error)
  }
})

const genres = []

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    moviesData: [],
    genresData: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.loading = true
    },
    [getMovies.fulfilled]: (state, action) => {
      state.loading = false
      state.moviesData = action.payload
      getGenres(action.payload)
      state.genresData = genres
      state.isSuccess = true
    },
    [getMovies.rejected]: (state, action) => {
      state.message = "failed"
      state.loading = false
      state.isSuccess = false
    },
  },
})

const getGenres = (data) => {
  data.forEach((item) => {
    item.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
      genres.sort()
    })
  })
}

export default movieSlice
