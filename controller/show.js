const Show = require("../models/show");
const User = require("../models/user");

const getShows = async (req, res) => {
  const { type, page = 1 } = req.query;

  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "You are not allowed to view the show. Please login and try again" });
    }
    const query = {};
    if (type) {
      query.type = type;
    }
    if (user.age < 18) {
      query.rating = { $ne: "R" };
    }

    const pageSize = 15;
    const skipData = (page - 1) * pageSize;
    const totalCount = await Show.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);
    const shows = await Show.find(query).skip(skipData).limit(pageSize);
    return res
      .status(200)
      .json({
        message: "Successfully get shows",
        data: {
          shows,
          page,
          pageSize: shows.length,
          hasNextPage: page < totalPages,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
const getShowById = async (req, res) => {
  const showId = req.params.id;
  const user = await User.findById(req.body.userId);

  try {
    if (!user) {
      return res.status(404).json({ message: "You are not allowed to view the show. Please login and try again" });
    }
    const show = await Show.findOne({ show_id: showId });

    if (user.age < 18 && show.rating === 'R') {
      return res.status(403).json({ message: "You are under aged to see the show" });
    }

    if (!show) {
      return res.status(404).json({ message: 'Show not found' });
    }

    res.status(200).json({ message: 'Show details fetched successfully', data: { show } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getShows, getShowById };
