const genreList = () => {
    const genres = [
        "mystery", 
        "fantasy",
        "romance",
        "thriller",
        "horror",
        "fiction",
        "nonfiction",
        "travel",
        "science",
        "history",
        "self-help",
        "biography",
        "dystopian",
        "adventure",
        "historical fiction",
        "science fiction",
        "poetry",
        "memoir",
        "children",
        "humor",
        "crime",
        "western",
        "graphic novel",
        "philosophy",
        "religious",
        "spirituality",
        "business",
        "cooking",
        "art",
        "music",
      ];
      

  const randomGenres = genres[Math.floor(Math.random() * genres.length)]

  return randomGenres;
};

export default genreList;
