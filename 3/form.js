
const codes = {
    'USA':'+1',
    'Canada':'+1',
    'Australia':'+61',
    'England':'+44',
    'Singapore':'+65',
    'New Zealand':'+64',
    'Mexico':'+52',
    'Spain':'+34',
    'Argentina':'+54',
    'Colombia':'+57',
    'Hong Kong':'+852',

}


$('#countryID').on("change", function() {
    $('#countryID').css('border', 'none');
     const county = this.value;
   
    const codesCounry = codes[county];
   

    $('#telID').attr('placeholder', codesCounry);
})

$('#prizeID').on("change", function() {
    $('#prizeID').css('border', 'none');
})


$('#participateID').on("change", function() {
    const check = $('#participateID').is(':checked');
    if (check) {
         $('#telID').prop('required', true);
         $('#nameID').prop('required', true);    
    } else {
        $('#telID').prop('required', false);
        $('#nameID').prop('required', false);   
    }
    
})



$("form").submit(function(event) {
    event.preventDefault();
    var data = $(this).serializeArray();
    console.log(data);

   const checkCountry =  data.find((value) => { 
       if (value.name === "country") {
           return true;
       }
   })

   if (!checkCountry) {
       $('#countryID').css('border', '1px solid red');
       return false;
   } else {
        $('#countryID').css('border', 'none');
   }

   const checkPri = $('#participateID').is(':checked');

   if (checkCountry) {
    const checkCountry =  data.find((value) => { 
        if (value.name === "prize") {
            return true;
        }
    })

    if (checkCountry) {
        $('#prizeID').css('border', '1px solid red');
        return false    
    }  else {
        $('#prizeID').css('border', 'none');     
    }
   } 

//    const checkPrize = $('#participateID').is(':checked');

//    if (!checkPrize) {
//     // prizeID
//     // phoneID
//        // $('#nameID').css('border', '1px solid red');
//    } else {

//    }


  

        $.ajax({
        type: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        dataType: "json",
        data: data,
    }).done(function(response) {
        // alert('fwerf');
        
    }).fail(function(error, textStatus) {
            console.log(error, textStatus);
            alert('Please fill in the required fields');
    });

});