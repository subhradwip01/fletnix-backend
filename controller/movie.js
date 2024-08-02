const Movie = require("../models/Movie");
const User = require("../models/user");

const getMovies = async (req, res) => {
  const { type, page = 1 } = req.query;

  try {
    console.log(req.body.userId);
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const query = {};
    if (type) {
      query.type = type;
    }
    if (user.age < 18) {
      query.rating = { $ne: "R" }; // Exclude 'R' rated movies for users under 18
    }
    
    const pageSize = 15;
    const skipData = (page - 1) * pageSize;
    const totalCount = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);
    const movies = await Movie.find(query).skip(skipData).limit(pageSize);
    return res
      .status(200)
      .json({
        message: "Successfully get movies",
        data: {
          movies,
          page,
          pageSize: movies.length,
          hasNextPage: page < totalPages,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getMovieById = async (req, res) => {
    const showId = req.params.id;
  
    try {
      const show = await Movie.findOne({show_id:showId});
  
      if (!show) {
        return res.status(404).json({ message: 'Show not found' });
      }
  
      res.status(200).json({ message: 'Show details fetched successfully', data:{show}});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

module.exports = { getMovies, getMovieById };
