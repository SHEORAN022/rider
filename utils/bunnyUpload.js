const axios = require("axios");

const uploadToBunny = async (
  file,
  folder = "rider-orders"
) => {

  const fileName =
    `${Date.now()}-${file.originalname}`;

  const uploadUrl =
    `${process.env.BUNNY_STORAGE_ENDPOINT}/${process.env.BUNNY_STORAGE_ZONE}/${folder}/${fileName}`;

  try {

    console.log(
      "UPLOAD URL =>",
      uploadUrl
    );

    const response =
      await axios.put(
        uploadUrl,
        file.buffer,
        {
          headers: {
            AccessKey:
              process.env.BUNNY_ACCESS_KEY,
            "Content-Type":
              file.mimetype,
          },
          maxBodyLength: Infinity,
        }
      );

    console.log(
      "BUNNY SUCCESS =>",
      response.status
    );

    return {
      fileName,

      url:
        `${process.env.BUNNY_CDN_URL}/${folder}/${fileName}`,
    };

  } catch (err) {

    console.log(
      "BUNNY ERROR STATUS =>",
      err.response?.status
    );

    console.log(
      "BUNNY ERROR DATA =>",
      err.response?.data
    );

    throw err;
  }
};

module.exports = uploadToBunny;