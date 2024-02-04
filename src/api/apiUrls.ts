const api = {
  getData: (text?: string, requestedPage?: number) => {
    if (text) {
      return `https://api.unsplash.com/search/photos?per_page=30&page=${requestedPage}&lang=en&lang=ru&query=${text}`;
    }
    return 'https://api.unsplash.com/photos/random?count=30';
  },
};

export default api;
