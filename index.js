function cmyk2rgb(c, m, y, k) {
  var result = new Object();
  
  result.red = 255 * (1 - c) * (1 - k);
  result.green = 255 * (1 - m) * (1 - k);
  result.blue = 255 * (1 - y) * (1 - k);
  return result;
}

function hex2rgb(hex) {
  var result = new Object();
  var bigint = parseInt(hex.replace("#",""), 16);
  
  result.red = (bigint >> 16) & 255;
  result.green = (bigint >> 8) & 255;
  result.blue = bigint & 255;
  return result;
}

function similarColor(a1, a2, a3, a4) {
  var info = new Object();
  info.red = a1;
  info.green = a2;
  info.blue = a3;
  
  if(a4!=null)  info = cmyk2rgb(a1, a2, a3, a4);
  if(a1!=null&&a2==null) info = hex2rgb(a1);
  
  var color = [];
  var colorNames = ["Black","White","Yellow","Green","Blue","Red","Cyan","Magenta","Gray","LightBlue","DarkBlue","DarkRed","LightRed","LightGreen","DarkGreen","LightYellow","DarkYellow","lightGray","DarkGray","LightCyan","DarkCyan","DarkMagenta","LightMagenta"];
  var colorRGBs = [[0,0,0],[255,255,255],[255,255,0],[0,255,0],[0,0,255],[255,0,0],[0,255,255],[255,0,255],[136,136,136],[149,200,216],[0,0,139],[139,0,0],[255,204,203],[152,251,152],[0,100,0],[255,252,187],[212,175,55],[211,211,211],[84,84,84],[224,255,255],[1,99,99],[84,4,84],[255,128,255]];
  
  colorNames.forEach(n=>{
    var index = colorNames.indexOf(n);
    
    color[index] = new Object();
    color[index].name = colorNames[index];
    color[index].distance = Math.abs(info.red-colorRGBs[index][0])+Math.abs(info.green-colorRGBs[index][1])+Math.abs(info.blue-colorRGBs[index][2]);
  });
    
  return color.sort(function(a, b){
    return a.distance - b.distance;
  })[0].name;
}
