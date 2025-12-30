// PnP Super Animals Card Reader Barcode Generator
// https://andremiller.net/content/pnp-super-animals-card-reader-barcode-generator/
// Andre Miller 2016-08-13

function setbarcode() {
    var card_number = $('#card_number').val();
    if (card_number > 255 || card_number < 0) {
        card_number = 1;
        $('#card_number').val(1); 
    }
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var bits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    var bitcount = 0;
    for (var i = 0; i < 8; i++) {
        if (card_number & 1 << i) {
            bitcount++;
            bits[8 - i + 1] = 1;
        }
    }
    if (bitcount % 2) {
        bits[10] = 1;
    } else {
        bits[11] = 1;
    }
    var bar_spacing = 16.85; // 4.46mm
    var bar_thin = 5; // 1.3mm
    var bar_thick = 10.4; // 2.75mm
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for (var i = 0; i < 13; i++) {
        if (bits[i]) {
            width = bar_thick;
        } else {
            width = bar_thin;
        }
        ctx.fillRect(
            i * bar_spacing + 10, 10,
            width, 100);
    }
}
function print_card(){
        var win=window.open();
        win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
        //win.print();
        //win.location.reload();
    }

setbarcode();
$("#printCard").click(function(){ print_card(); });
$("#setBarCode").click(function(){ setbarcode(); });
