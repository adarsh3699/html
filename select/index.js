// const cars = ["", "volvo", "Saab", "mercedes", "Audi", "suzuki", "BMW"];

// function getOptions(array) {
//   let html = "";
//   for (let i = 0; i < array.length; i++) {
//     let option = array[i];
//     html+= ("<option id='"+ i +"' value='"+i+"'>"+ option +" </option>");
//   }
//   return html;
// }

// $("select").html(getOptions(cars));

// $("#cars1").on('change', function() {
//   let selectedId = $("#cars1 option:selected").attr("id");
 
//   let clonedCars = [...cars];
//   clonedCars.splice(selectedId, 1);
//   var temp = $('#cars1').find(":selected").text();
  
//   $("#cars2").html(getOptions(clonedCars));
  
//   $("#cars2").on('change', function() {
//     let selectedId = $("#cars2 option:selected").attr("id");
  
//     let clonedCars2 = [...clonedCars];
//     clonedCars2.splice(selectedId, 1);
  
//     $("#cars3").html(getOptions(clonedCars2));

//     $("#cars3").on('change', function() {
//       let selectedId = $("#cars3 option:selected").attr("id");
  
//       let clonedCars3 = [...clonedCars2];
//       clonedCars3.splice(selectedId, 1);
//       clonedCars3.push(temp);
//       $("#cars1").html(getOptions(clonedCars3));
//       $("#cars1").val("4");
//     });
//   });
// });

const cars = [
  {
    name: "Volvo",
    selectedAtDropDown: undefined,
  },
  {
    name: "Land Rover",
    selectedAtDropDown: undefined,
  },
  {
    name: "Mercedes",
    selectedAtDropDown: undefined,
  },
  {
    name: "Audi",
    selectedAtDropDown: undefined,
  },
  {
    name: "Suzuki",
    selectedAtDropDown: undefined,
  },
  {
    name: "BMW",
    selectedAtDropDown: undefined,
  },
  {
    name: "Toyota",
    selectedAtDropDown: undefined,
  }
];

function renderOptions(array, dropDownPosition) {
    let html = "<option></option>"; //1st option empty 
    
    for (let i = 0; i < array.length; i++) {
        let option = array[i];
        let temp = (option.selectedAtDropDown == dropDownPosition) ? "selected" : "";

        if ((option.selectedAtDropDown != undefined) && (option.selectedAtDropDown != dropDownPosition)) {
            continue;
        }
        html+= ("<option pos='" + i + "' value='" + option.name + "' " + temp + ">"+ option.name +"</option>");
    }
    return html;
}

$("select").html(renderOptions(cars, 0));
//2nd attr renderOption is 0 to fulfill the condition :- case1(undefined != 0 )

$("select").on("change", function() {
    const thisDropDownPosition = $(this).attr("id");
    const selectedOptionPosition = $("#" + thisDropDownPosition + " option:selected").attr("pos");

    const prevSelectedOptionPosition = $(this).attr("prevSelectedOptionPosition");
    //store positon of prev option 
    if (prevSelectedOptionPosition) {
        cars[prevSelectedOptionPosition].selectedAtDropDown = undefined;
    }

    cars[selectedOptionPosition].selectedAtDropDown = thisDropDownPosition;

    $(this).attr("prevSelectedOptionPosition", selectedOptionPosition);

    $("#1").html(renderOptions(cars, 1));
    $("#2").html(renderOptions(cars, 2));
    $("#3").html(renderOptions(cars, 3));
})