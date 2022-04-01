const cars = ["", "volvo", "Saab", "mercedes", "Audi", "suzuki", "BMW"];

function getOptions(array) {
  let html = "";
  for (let i = 0; i < array.length; i++) {
    let option = array[i];
    html+= ("<option id='"+ i +"' value='"+i+"'>"+ option +" </option>");
  }
  return html;
}

$("select").html(getOptions(cars));

$("#cars1").on('change', function() {
  let selectedId = $("#cars1 option:selected").attr("id");
 
  let clonedCars = [...cars];
  clonedCars.splice(selectedId, 1);
  var temp = $('#cars1').find(":selected").text();
  
  $("#cars2").html(getOptions(clonedCars));
  
  $("#cars2").on('change', function() {
    let selectedId = $("#cars2 option:selected").attr("id");
  
    let clonedCars2 = [...clonedCars];
    clonedCars2.splice(selectedId, 1);
  
    $("#cars3").html(getOptions(clonedCars2));

    $("#cars3").on('change', function() {
      let selectedId = $("#cars3 option:selected").attr("id");
  
      let clonedCars3 = [...clonedCars2];
      clonedCars3.splice(selectedId, 1);
      clonedCars3.push(temp);
      $("#cars1").html(getOptions(clonedCars3));
      $("#cars1").val("4");
    });
  });
});