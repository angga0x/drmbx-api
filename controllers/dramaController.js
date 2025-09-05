const dramaService = require('../services/dramaService.obfuscated');

const downloadDrama = async (req, res) => {
  const { url, index } = req.body;

  if (!url || !url.includes('https://app.dramaocean.com/db_land_page/')) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid or missing DramaBox URL.'
    });
  }

  try {
    const bid = new URL(url).searchParams.get('bid');
    if (!bid) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid DramaBox URL: Missing "bid" parameter.'
      });
    }

    let dramaData;
    if (index !== undefined) {
      // Fetch a single chapter if index is provided
      dramaData = await dramaService.fetchDramaBoxPage(bid, index);
    } else {
      // Fetch all chapters if no index is provided
      dramaData = await dramaService.fetchAllDramaData(bid);
    }

    if (!dramaData) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Failed to fetch drama data.'
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Success',
      data: dramaData
    });
  } catch (error) {
    console.error('Error in downloadDrama controller:', error.message);
    res.status(500).json({
      statusCode: 500,
      message: 'An internal error occurred.'
    });
  }
};

module.exports = {
  downloadDrama
};
