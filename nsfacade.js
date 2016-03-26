/**
 * Created by nadia on 2016-03-21.
 */

function nsupdateEmail(){
    $("#txtEmail").val(localStorage.getItem("DefaultEmail"));
}

function nsupdateTypesDropdown() {

    function successSelectAll(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            console.info(row);
            add_Options(row['name'], row['id'], i);
        }

        function add_Options(textOption, valueOption, index ) {

            var add_Option = new Option(textOption, valueOption);

            document.getElementById("cmbType").options[index] = add_Option;

            if (textOption == 'Other') {
                document.getElementById("cmbType").options[index].setAttribute("selected", "selected");
                $("#cmbType").selectmenu('refresh', true);
            }
            return true;
        }
    }
    Type.nsselectAll(successSelectAll);
}

function nsaddFeedback(){

    if (doValidate_Form("#nsAddForm")){

        var businessName =$("#txtName").val();
        var typeId = $("#cmbType").val();
        var reviewerEmail = $("#txtEmail").val();
        var reviewerComments = $("#comments").val();
        var reviewDate = $("#txtDate").val();
        var hasRating = $("#chkRate").prop("checked");

        if ($("#chkRate").is(":checked")){

            var rating1 = $("#txtQuality").val();
            var rating2 = $("#txtService").val();
            var rating3 = $("#txtValue").val();
        }

        else{
            var rating1 = 0;
            var rating2 = 0;
            var rating3 = 0;
        }

        var options = [businessName, typeId, reviewerEmail, reviewerComments,
                            reviewDate, hasRating, rating1, rating2, rating3 ];
        Review.nsinsert(options);
    }
}

function nsgetReviews(){

    function successSelectAll(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                " href='#'>" +
                "<h1>Business Name: "+ row['businessName'] +"</h1>" +
                "<h2>Reviewer Email: "+ row['reviewerEmail']+"</h2>" +
                "<h3>Comments: "+ row['reviewerComments']+"</h3>";


            if(row['hasRating']=='true'){
               var ratings = calculateRatings(row['rating1'] , row['rating2'] ,row['rating3']);
                htmlCode += "<h3>Overall Rating: "+ ratings +"</h3></a></li>";
            }

           else
                htmlCode += "<h3>Overall Rating: "+ 0 +"</h3></a></li>";
        }

        var lv = $("#lvAll");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#lvAll a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', "#nsEditFeedbackPage");
        }
    }
    Review.nsselectAll(successSelectAll);
}

function nsshowCurrentReview(){

    var id = localStorage.getItem("id");
    var options = [id];

    function successSelectOne(tx, results) {

        var row = results.rows[0];

        $("#txtBusinessName").val(row['businessName']);
        $("#cmbType1").val(row['typeId']);
        $("#cmbType1").selectmenu("refresh", true);
        $("#txtReviewerEmail").val(row['reviewerEmail']);
        $("#txtReviewerComments").val(row['reviewerComments']);
        $("#txtReviewDate").val(row['reviewDate']);

        if (row['hasRating']=='true') {
            $("#chkHasRating").prop("checked", true);
            $("#rating_div").show();
            $("#txtQuality1").val(row['rating1']);
            $("#txtService1").val(row['rating2']);
            $("#txtValue1").val(row['rating3']);
            $("#txtRatings1").val(calculateRatings(row['rating1'] , row['rating2'] ,row['rating3']));
          }
        else{
            $("#chkHasRating").prop("checked", false);
            $("#rating_div").hide();
            $("#txtQuality1").val(0);
            $("#txtService1").val(0);
            $("#txtValue1").val(0);
            $("#txtRatings1").val(0);
        }
        $("#nsModifyForm :checkbox").checkboxradio("refresh");
    }
    Review.nsselect(options, successSelectOne);
}

function nsupdateFeedback(){

    if (doValidate_Form("#nsModifyForm")) {

        var id = localStorage.getItem("id");

        var businessName = $("#txtBusinessName").val();
        var typeId = $("#cmbType1").val();
        var reviewerEmail = $("#txtReviewerEmail").val();
        var reviewerComments = $("#txtReviewerComments").val();
        var reviewDate = $("#txtReviewDate").val();
        var hasRating = $("#chkHasRating").prop("checked");

        if ($("#chkHasRating").is(":checked")) {

            var rating1 = $("#txtQuality1").val();
            var rating2 = $("#txtService1").val();
            var rating3 = $("#txtValue1").val();
        }

        else {
            var rating1 = 0;
            var rating2 = 0;
            var rating3 = 0;
        }

        var options = [ businessName, typeId, reviewerEmail, reviewerComments,
                                 reviewDate, hasRating, rating1, rating2, rating3, id ];
        Review.nsupdate(options);
        location.href ="#nsViewFeedbackPage";
    }
}

function nsdeleteFeedback(){
    var id = localStorage.getItem("id");
    var options = [id];
    Review.nsdelete(options);
    location.href ="#nsViewFeedbackPage";
}

function nsclearDatabase(){
    var result = confirm("Do you really want to clear the database? All data will be lost");
    try {
        if (result) {
            DB.nsDropTables();
            alert("Database Cleared!");
        }
    } catch (e) {
        alert(e);
    }
}
































