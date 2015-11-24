var originalMessage = '16XK3721093241115010006E'; // message to compare to
var myMessage = 'XK3721093241115010';
// actual message from panel was '16XK3721093241115010006E'
// should prove out to be the same after running this test

// calcChecksum and writeAscii are from
// https://github.com/kevinohara80/elkington/blob/master/lib/messaging.js
// thank you, i almost built these. If you want to see Elk's recommended
// method in C, check out section 9/page 68 of the 'ASCII Protocol RS-232
// Interface Specification' v1.82 May 15, 2015

var calcChecksum = function(string) {
  var buf = new Buffer(string);

  // Calculate the modulo 256 checksum
  var sum = 0;
  for (var i = 0, l = buf.length; i < l; i++) {
    sum = (sum + buf[i]) % 256;
  }
  // Find the compliment
  sum = 256 - sum;

  // Convert to a two byte uppercase hex value
  var chars = sum.toString(16).toUpperCase();
  if (chars.length == 1) chars = '0' + chars;
  return chars;

}

var writeAscii = function(command) {
  var ascii;
  var len;
  var lenString;
  var cc;

  // add the reserved 00 from elk protocol
  command = command + '00';

  // calculate the ascii length and prepend the string
  len = command.length + 2;
  lenString = len.toString(16).toUpperCase();
  if(lenString.length == 1) lenString = '0' + lenString;
  ascii = lenString + command;

  // get the checksum and append
  cc = calcChecksum(ascii);
  ascii = ascii + cc + '\r\n';

  return ascii;
}

console.log('Message original: ' + originalMessage);

console.log('  Message before:   ' + myMessage);

var myCalcMessage = writeAscii(myMessage);

console.log('   Message after: ' + myCalcMessage);
