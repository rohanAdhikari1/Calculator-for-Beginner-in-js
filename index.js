// Content by Rohan Adhikari (rohandhikari.com.np)
var prv_opr="",prev_num = "",prv_dat="",calc = false;
function changecss(){
    if($(".buffering").css("display") == "none"){
    $("#result").css("padding-top", "10px");
}else{
    $("#result").css("padding-top", "0");
}
}
changecss();
function updatedata(b){
    if((prv_dat&& prv_opr) == ""){
        $(".buffering").css("display", "none");
    }else{
        $(".buffering").css("display", "block");
        $(".buffering").html(prv_dat+prv_opr);
    }
    $("#result").html(b);
    changecss();
}
function calculate(){
    newvalue = "";
    if((prv_dat&&prv_opr) != ""){
         switch(prv_opr){
            case "÷":
                newvalue= prv_dat / prev_num;
                break;
            case "×":
                newvalue= prv_dat * prev_num;
                break;
            case "−":
                newvalue= prv_dat - prev_num;
                break;
            case "+":
                newvalue= parseInt(prv_dat) + parseInt(prev_num);
                break;
         }
    }else{
        newvalue = prev_num;
    }
    return newvalue;
}

function handlesymbol(sym){
    console.log(sym)
    switch(sym){
        case "C":
            prev_num = "";
            prv_opr = "";
            prv_dat = "";
            $(".buffering").css("display", "none");
            $("#result").html("0");
            changecss();
            break;
        case "←":
            newval = prev_num.substring(0,prev_num.length-1);
            prev_num=newval;
            updatedata(newval == ""?0:newval);
            break;
        case "÷":
            prv_dat = prev_num != ""?calculate():prv_dat;
            prv_opr = "÷";
            prev_num = "";
            updatedata(0);
            break;
        case "×":
            prv_dat = prev_num != ""?calculate():prv_dat;
            prv_opr = "×";
            prev_num = "";
            updatedata(0);
            break;
        case "−":
            prv_dat = prev_num != ""?calculate():prv_dat;
            prv_opr = "−";
            prev_num = "";
            updatedata(0);
            break;
        case "+":
            prv_dat = prev_num != ""?calculate():prv_dat;
            prv_opr = "+";
            prev_num = "";
            updatedata(0);
            break;
        case "=":
            nvm = prev_num != ""?calculate():prv_dat;
            prv_dat = "";
            prv_opr = "";
            calc = true;
            prev_num = nvm;
            updatedata(nvm);
            break;       
    }
}
$(".calc-button").click((e) => {
    var event_val = parseInt(e.target.innerText);
    if(isNaN(event_val))
    {
        handlesymbol(e.target.innerText);
    }else{
        if(calc){
            calc = false;
            prev_num = event_val;
        }else{
            prev_num += event_val;
        }
        $("#result").html(prev_num);
    }
});