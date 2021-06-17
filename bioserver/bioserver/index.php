<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">


  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/font-awesome.min.css">

  <title>Bioserver Implementation Project</title>

<style>


  #ser{
    margin-top:10vh
  }
  #ser button{
    margin: 3%;
  }

  #buttons button{
    margin: 1.5vh;
  }
  #gene{
    margin-top: 10vh;
  }
  #k{
    margin-top:1.7vh;
  }
  .error{
  
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            box-shadow: 1px 1px 2px red;

  }


</style>
</head>
<body>

<div class="container" id="gene">
  <div class="row">

    <div class="col-md-12">
      <textarea name="seq" id="sequence" class="form-control" cols="30" rows="10"></textarea>
    </div>

    <div class="col-md-12" id="buttons">
      <div class="row">
      <div class="col-md-2 "><button onclick="apply_function('complement')" class="btn btn-primary">complement</button></div>
      <div class="col-md-2"><button onclick="apply_function('reverse')" class="btn btn-danger">reverse</button></div>
      <div class="col-md-2"><button onclick="apply_function('gc_content')" class="btn btn-success">gc content</button></div>

      <div class="col-md-1 row "><button onclick="apply_function('kmers')" class="btn btn-warning">kmers</button></div>
      <div class="col-md-2 "><input type="number" name="k" id="k" class="form-control" placeholder="K value" required></div>

      <div class="col-md-1"><button onclick="apply_function('protein_translation')" class="btn btn-warning">protein translation</button></div>

      </div>

   

    <div class="col-md-12">
      <textarea name="seq" id="result" class="form-control" cols="30" rows="10" disabled=""></textarea>
    </div>

  </div>
</div>

<div class="container" id="ser">
<label class="control-label">search: </label>

    <div class="row">
<div class="col-md-5">

<input id="filter_value" class="form-control">
</div>
<div class="col-md-3">
<select id="filter_name"class="form-control">
  
  <option value="sequence_id">Sequence Id</option>
  <option value="sequence_name">Sequence Name</option>
  <option value="sequence">Sequence</option>
</select>
</div>
<div class="col-md-3">
  <button class='btn btn-danger' onclick="search()">search</button>

</div>
</div>


</div>


<div class="container">

<table class="table table-bordered "  >
	<tr>
		<th>id</th>
		<th>name</th>
		<th>Sequence</th>
		<th>created at</th>
		<th>updated at</th>
		
		<th>update</th>
		<th>delete</th>
	</tr>

	 <tbody id="seq_table" style="width:100%">
		
	</tbody>
</table>
<button class='btn btn-success' onclick='insert()'>Insert</button>

<div class="alert alert-success" style="display: none;" id="alert">
   
</div>

<div class="alert alert-danger" style="display: none;" id="alertfail">
   
</div>

</div>


<div class="container" id="insert">



</div>

<div style="height: 200px"></div>


<script>
var url = "apis/";
  
  getTableData();

  function alert_success(msg){
    document.getElementById('alert').innerHTML = msg;
    document.getElementById('alert').style.display = 'block';
    setTimeout(function(){document.getElementById('alert').style.display = 'none'}, 1700);
  }
  function alert_error(msg){
    document.getElementById('alertfail').innerHTML = msg;
    document.getElementById('alertfail').style.display = 'block';
    setTimeout(function(){document.getElementById('alertfail').style.display = 'none'}, 1700);
  }
  
  function search(){
 
  		var options = document.getElementById('filter_name').options;
		var filter_name   = options[options.selectedIndex].value;
  		getTableData(filter_name,document.getElementById('filter_value').value);
  }

  function getTableData(filter_name,filter_value) {
    api_url = 'get_sequences';
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var parsedData = JSON.parse(this.responseText);
        if(parsedData['status']){
          sequences = parsedData['data'];
          var tableData = "";
          for(sequence of sequences){
            tableData += `<tr>
					<td>${sequence['sequence_id']}</td>
					<td>${sequence['sequence_name']}</td>
					<td>${sequence['sequence'].substr(0, 50)}</td>
					<td>${sequence['created_at']}</td>
					<td>${sequence['updated_at']}</td>
					<td> <button class='btn btn-primary' onclick="update(${sequence['id']},'${sequence['sequence_id']}','${sequence['sequence_name']}','${sequence['sequence']}')">edit</button></td>
					<td> <button class='btn btn-danger' onclick='del(${sequence['id']})'>delete</button></td>

					</tr>`;
                  }
              document.getElementById("seq_table").innerHTML = tableData;
        }else{
          document.getElementById("seq_table").innerHTML = "";
        }
      }
    };

	xhttp.open("GET", url+api_url+`.php?${filter_name}=${filter_value}`, true);

  sequence = document.getElementById("sequence").value;

    xhttp.send();
  }

function del(id){
  var api_url = "delete_sequence";
	var result = confirm("Sure to delete?");
	if (result) {
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function() {
		  if(this.readyState === 4 && this.status == 200) {
		  	var parsedData = JSON.parse(this.responseText);
		    if(parsedData['status']){
            alert_success(parsedData['msg']);
        }else{
          alert_error(parsedData['msg']);
        }
            getTableData();
		  }
		});
		xhr.open("DELETE", url+api_url+".php?id="+id);
		xhr.send();
	}
}

function save_add(){

if(document.getElementById('sequence_id').value!=''){
var api_url = "add_sequence";
var data = new FormData();
data.append("sequence_id", document.getElementById("sequence_id").value);
data.append("sequence_name", document.getElementById("sequence_name").value);
data.append("sequence", document.getElementById("insert_sequence").value);

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4 && this.status == 200) {
    var parsedData = JSON.parse(this.responseText);
    if(parsedData['status']){
      getTableData();
      document.getElementById('insert').innerHTML = '';
      alert_success(parsedData['msg']);
    }else{
        alert_error(parsedData['msg']);
    }
  }
  });

  xhr.open("POST", url+api_url+".php");
  xhr.send(data);
  }

  if(document.getElementById('sequence_id').value==''){
  document.getElementById('sequence_id').classList = 'error';
  }
  else{
  document.getElementById('sequence_id').classList ='form-control';
  }

}

function save_edit(){
  if(document.getElementById('edit_sequence_id').value != ''){
	  api_url = "edit_sequence";
	  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
                var parsedData = JSON.parse(this.responseText);
                if(parsedData['status']){
              		alert_success(parsedData['msg']);
              		getTableData();
              		document.getElementById('insert').innerHTML = '';
                }else{
          alert_error(parsedData['msg']);
        }
      }
    };
      xhttp.open("POST", url+api_url+".php", true);
    
    data = "id="+ document.getElementById("edit_id").value;
    data += "&sequence_id=" + document.getElementById("edit_sequence_id").value;
    data += "&sequence_name=" + document.getElementById("edit_sequence_name").value;
    data += "&sequence=" + document.getElementById("edit_sequence").value;

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xhttp.send(data);
	
  }


  if(document.getElementById('edit_sequence_id').value==''){
    document.getElementById('edit_sequence_id').classList = 'error';
  }
  else{
    document.getElementById('edit_sequence_id').classList ='form-control';
  }

}

  function apply_function(api_url) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
                var parsedData = JSON.parse(this.responseText);
                if(parsedData['status'])
              document.getElementById("result").innerHTML = parsedData['data']['result'];
      }
    };
      
      xhttp.open("POST", url+api_url+".php", true);
    

      sequence = document.getElementById("sequence").value;

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "sequence="+sequence;
    
      if(api_url == 'kmers'){
        if(document.getElementById('k').value!='')
          data += "&k=" + document.getElementById("k").value;
          else{
          alert("Enter length of mer");
          return;
        }
        }
      xhttp.send(data);
  }


function insert(){
document.getElementById('insert').innerHTML = `

<div class='row'>
  <div class='col-md-3'> 
    <label class="control-label">Id: </label>
    <input class='form-control' id="sequence_id" required>
    </div>
   
    <div class='col-md-3'>
      <label class="control-label">Name: </label>
       <input class='form-control' id="sequence_name" required>
       
    </div> 
   
    <div class='col-md-6'>
      <label class="control-label">Sequence: </label>
       <textarea class='form-control' id="insert_sequence" required></textarea>
       </div>
   </div>
   <button  class='btn btn-success' onclick="save_add()" >Save</button>
   <button class='btn btn-danger' onclick="cancel()">Cancel</button>

   `;
}
function cancel(){
  document.getElementById("insert").innerHTML='';
}




function update(id,sequence_id,sequence_name,sequence){
document.getElementById('insert').innerHTML = `
<div class='row'>
	<input  id="edit_id" value="${id}" hidden>
  <div class='col-md-3'> 
    <label class="control-label">Id: </label>
    <input class='form-control' id="edit_sequence_id" value="${sequence_id}"  required>
    </div>
   
    <div class='col-md-3'>
      <label class="control-label">Name: </label>
       <input class='form-control' id="edit_sequence_name" value="${sequence_name}"  required>
       
    </div> 
   
    <div class='col-md-6'>
      <label class="control-label">Sequence: </label>
       <textarea class='form-control' id="edit_sequence"  required>${sequence}</textarea>
       </div>
   </div>
   <button class='btn btn-success' onclick="save_edit()">Save</button>
   <button class='btn btn-danger' onclick="cancel()">Cancel</button>
   `;
}


</script>



<script src="js/jquery.min.js"></script>

<script src="js/bootstrap.min.js"></script>

    </body>



</html>
