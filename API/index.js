// This js file is used for using the rapid  API FOR INSTAGRAM;
// by username, 


const http = require('https');
const name=require(path.join(__dirname,'../name.txt'));
const options = {
	method: 'GET',
	hostname: 'instagram28.p.rapidapi.com',
	port: null,
	path: `/user_info?user_name=${name}`,
	headers: {
		'X-RapidAPI-Key': '030b3fd1f4msh33fabca127ee8fbp145221jsnda1a6d766af4',
		'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
    const jsonResponse=JSON.parse(body.toString());
		 const {full_name,profile_pic_url,username,edge_followed_by,edge_follow,edge_owner_to_timeline_media}= jsonResponse.data.user;
      console.log(full_name,profile_pic_url,username,edge_followed_by,edge_follow,edge_owner_to_timeline_media);
    });
});

req.end();
 
