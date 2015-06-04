function log(text) {
  console.log(text);
  $("#console").prepend("<div>"+text+"</div>");
}

//----------------------------------------
// gluin
//----------------------------------------
// user infomation

 var user = "";
 var pass = "";
 var address = "";

// device id

var mydevice_id = localStorage.getItem("DEVICEID");
if (!mydevice_id) {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  mydevice_id = S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  localStorage.setItem("DEVICEID", mydevice_id);
}
var gluin = new DMS_Dx();

$("#login").click(function() {
  gluin.set_user(user, pass);
  gluin.set_server(address);

  gluin.connect(
    function() {
       log("gluin is connected.");
       var mydevice_name = "OWB Output";
       var mydevice_desc = "Demo";
       var mydevice_icon = "iSwitch";
       var mydevice_props = {
             "switch": {
               "value": false,
               "type": "boolean",
               "mode": "readwrite",
               "direction": "updown"
             }
           };
       gluin.dx_device_register_request(mydevice_id , mydevice_props, mydevice_name, mydevice_desc, mydevice_icon,
         function() {log("registered")},
         function() {log("didn't register")}
       );
    },
    function() {
      console.log("gluin connection is failed.");
    }
  );
  gluin.on_device_set_message = function(id, props) {
    console.log(props);
    if (id == mydevice_id) {
      if(props["switch"]["value"] == true) {
        log("recieved 'true'");
      } else {
        log("recieved 'false'");
      }
    }
  }
})

