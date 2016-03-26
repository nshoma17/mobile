/** Document: nsutil.js
 * Created by nadia on 2016-02-23.
 */

function showOrHide(checkbox,div) {
    if ($(checkbox).is(":checked")) {
        $(div).show();
    } else {
        $(div).hide();
    }
}

function   doValidate_Email(){
    var email = (document.getElementById("txtDefaultEmail").value);
    console.info(email);
    localStorage.setItem("DefaultEmail", email);
    alert("Default reviewer email saved");
}

function calculateRatings(quality , service ,value){
    percentage=0; var sum = 0;

    if(toString.call(quality)!="[object String]")
    {
           sum =  quality + service + value ;
    }
    else{
        sum = parseInt(document.getElementById(quality).value)
        + parseInt(document.getElementById(service).value)
        + parseInt(document.getElementById(value).value);
    }
    var percentage = Math.round(sum / 15 * 100) + "%";

    return percentage;
}

function doValidate_Form(frmName) {
    var form = $(frmName);

    form.validate({
        rules:{
            txtName:{
                required:true,
                rangelength: [2,20]
            },
            txtEmail:{
                required: true,
                email: true
            },
            txtReview:{
                required: true
            },
            txtQuality:{
                range: [0,5]
            },
            txtService:{
                range: [0,5]
            },
            txtValue:{
                range: [0,5]
            }
        },
        messages:{
            txtName:{
                required:"You must enter the name",
                rangelength: "Name must be  2-20 characters long"
            },
            txtEmail:{
                required: "Email address is required",
                email: "Enter a valid email address"
            },
            txtReview:{
                required: "Review Date is required"
            },
            txtQuality:{
                range: "Value must be 0-5"
            },
            txtService:{
                range: "Value must be 0-5"
            },
            txtValue:{
                range:  "Value must be 0-5"
            }
        }
    });
    return form.valid();
}