
export const fetchOptionsWithParams = {
  params: {
    lang: 'en',
    country: 'us',
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com',
  },
};

export const fetchDefaultOptions = {
  params: {
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com',
  },
};

export const anotherApiFetchDefaultOptions = {
  params: {
    geo: 'US',
  },

  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': 'yt-api.p.rapidapi.com',
  },
};


export const thirdDefaultOptions = {
  params: {
    hl: 'en',
    gl: 'US'
  },

  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': 'youtube-data8.p.rapidapi.com'
  }
};


