// this file is not use in my project it is just for checking


const http = require('https');
const fs=require('fs');
 
const filePath='/home/sangam/insta-project/json/sangam.json';
 const sangamData={ };

 fs.readFile(filePath,'utf-8',(err,data)=>{
	 
	try{
		const jsonData=JSON.parse(data);
		const {full_name,profile_pic_url,username,edge_followed_by,edge_follow,edge_owner_to_timeline_media}= jsonData.data.user;
 	 sangamData.fullName=full_name;
	 sangamData.profile_pic_url=profile_pic_url;
	 sangamData.username=username;
	 sangamData.followers=edge_followed_by.count;
	 sangamData.following=edge_follow.count;
	 

	 const extractedData =  edge_owner_to_timeline_media.edges.map((edge) => {
		const { display_url, edge_liked_by } = edge.node;
		return {
		  display_url,
		  'likes': edge_liked_by.count,
		};
	  });
	  sangamData.images=extractedData;
	  let sum=0,sizeA=extractedData.length;
	  for(var i=0;i<sizeA;i++){
		sum+=extractedData[i].likes;
	  }
	  sum=sum/sizeA;
	  sangamData.postLikes =extractedData.map(ele=>ele.likes)
	  sangamData.postDataUrl =extractedData.map(ele=>ele.display_url)
	  sangamData.postDataAvgLikes=parseInt(sum.toString());
	   
	   
}
	catch(error){
console.log("error is this ",error);
	}
});
console.log(sangamData);
module.exports=sangamData;



 
