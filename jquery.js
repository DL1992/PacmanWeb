
    var dic = {}
    dic['a'] = 'a'; // init the dic with the user a and password a for testing
    //validate all the fields in regesteration.
    $(document).ready(function() {
        $("#register").click(function() {
            var user_name = $("#user_name").val();
            var first_name = $("#first_name").val();
            var last_name = $("#last_name").val();
            var email = $("#email").val();
            var password = $("#password").val();
            var date = $("#date").val();
            if (user_name == '' || first_name == ''||last_name == ''|| 
                email == '' || password == '' || date == '') {
                alert("Please fill all fields!!");
            } else if ((password.length) < 8) {
                alert("Password should at least 8 character in length!! for your protection");
            } else if (!(password).match(/[A-z]/) || !(password).match(/\d/)) {
                alert("Your passwords must conatin at least 1 number and letter!");
            } else if((first_name.match(/\d/))){
                alert("Your first name should contain 0 numbers!");
            } else if((last_name.match(/\d/))){
                alert("Your last name should contain 0 numbers!");
            } else if((!validateEmail(email))){
                alert("enter a proper email!");
            } else {
                dic[user_name] = password;
                //should transform to the login screen.
            }
            });
        });

        $(document).ready(function() {
            $("#login").click(function() {
                var user_name = $("#login_user_name").val();
                var password = $("#login_password").val();
                if (dic[user_name]!= password){
                    alert("not the right password")
                } else {
                   alert("yay")
                   Start(); // should trasfrom to the game screen
                }
            });
        });


    function validateEmail(sEmail) {
        var filter = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/i);;
        if (filter.test(sEmail)) {
            return true;
        } else {
            return false;
        }
    }
    