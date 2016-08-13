var appId="njyjdvvylafy";
var appKey="a6f7fa13-90a0-4948-bdb3-48fa0fae275e";
var obj;
var lid;
var noticeCount = 0;

//Initializing CloudBoost App
CB.CloudApp.init(appId,appKey);

$(document).ready(function() {

		obj = new CB.CloudObject("Task_List");

		//obj.isSearchable = true;

		//creating an object for querying 'feed' data
		var query = new CB.CloudQuery("Task_List");
		query.orderByDesc('createdAt');
		query.setLimit(70);
		query.find({
			//query will return a list of CloudObjects.
			success: function(list){
				//extracting and appending data into html page from list of CloudObjects
				for (i = 0; i < list.length; i++) {
					$("#myTable").append("<tr><td  style='width:160px'>"+list[i].get('name')+"</td><td style='width:100px'>"+list[i].get('prio')+"</td><td><button type='button' onclick='done_task(this.value)'  id='done_"+list[i].get('id')+"' style=' width:50px;  display:inline-block; font-size:10px;' class='btn btn-warning'> <b>Done</b> </button><button type='button' id='del_"+list[i].get('id')+"' style=' margin-left:15px; width:50px; display:inline-block; font-size:10px;' class='btn btn-danger'><b> Delete</b> </button></td></tr>");
				}
			},
			error: function(err){
				console.log("unable to fetch data");
			}
		});
	
//post to feed
		$(document).on('click', '#new_task', function (){
			
				
			
			obj = new CB.CloudObject("Task_List");
			if($("#task_name").val()!="" && $("#prio").val()!=0){
				obj.set("name", $("#task_name").val());
				obj.set("prio",$("#prio").val());
				obj.set("status","incomplete");
				
				obj.save({
					success: function(obj) {
						console.log('posted to sample app');
					},
					error: function(err) {
						console.log("oops!! a problem occured while posting.. please try again.");
					}
				});
			}
			return false;
		});
});