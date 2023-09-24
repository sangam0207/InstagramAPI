const fs = require('fs'); // Use fs.promises for async file operations

const filePath = '/home/sangam/insta-project/json/sangam.json';

var userKaNaam;
try {
  // Read the file synchronously
  const dataName = fs.readFileSync('../name.txt', 'utf8');
  
  userKaNaam = dataName;
  console.log(userKaNaam);
} catch (err) {
  console.error('Error reading the file:', err);
}


const readAndProcessData = async ( ) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
const jsonData = JSON.parse(data);

const { full_name, profile_pic_url,username, edge_followed_by, edge_follow, edge_owner_to_timeline_media } = jsonData.data.user;

const sangamData = {
  fullName: full_name,
  profile_pic_url: profile_pic_url,
  username: username, // Assign the value of userKaNaam to the username property
  followers: edge_followed_by.count,
  following: edge_follow.count,
};

    const extractedData = edge_owner_to_timeline_media.edges.map((edge) => {
      const { display_url, edge_liked_by } = edge.node;
      return {
        link:  display_url, // Encode the display_url
        likes: edge_liked_by.count,
      };
    });

    sangamData.images = extractedData;
    console.log(sangamData.images);

    let sum = 0;
    const sizeA = extractedData.length;

    for (var i = 0; i < sizeA; i++) {
      sum += extractedData[i].likes;
    }

    sum = sum / sizeA;

    sangamData.postLikes = extractedData.map((ele) => ele.likes);
    sangamData.postDataUrl = extractedData.map((ele) => ele.link); // Use the encoded URLs here
    sangamData.postDataAvgLikes = parseInt(sum.toString());

    return sangamData; // Return the data
  } catch (error) {
    console.log("Error:", error);
    throw error; // Rethrow the error
  }
};

module.exports = readAndProcessData();
