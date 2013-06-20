var context2, canvasEl, context;
  
  var iOffsetX = 19.302721088435362;
    var iOffsetY = -2.0408163265306314;
  var iRatio = 0.08503401360544217;
  
  var sBGColor = "#000";
    var sFGColor = "#333";
    var sBorderColor = "#000";
  
  var currentColour = '';
  
  var countryColours = [];
  
    var visitedCountries = {
    'pe': {name:'Peru', colour:''},
    'id': {name:'Indonesia', colour:''},
    'cn': {name:'China', colour:''},  
    'ua': {name:'Ukraine', colour:''},
    'by': {name:'Belarus', colour:''},
    'kz': {name:'Kazakhstan', colour:''},
    'tr': {name:'Turkey', colour:''},
    'za': {name:'South Africa', colour:''},
    'ar': {name:'Argentina', colour:''}, 
    'cl': {name:'Chile', colour:''}, 
    'cu': {name:'Cuba', colour:''}, 
    'mx': {name:'Mexico', colour:''}, 
    'br': {name:'Brazil', colour:''}, 
    'ru': {name:'Russian Federation', colour:''}, 
    'us': {name:'United States', colour:''},  
    'gb': {name:'United Kingdom', colour:''}, 
    'fr': {name:'France', colour:''}, 
    'it': {name:'Italy', colour:''}, 
    'eg': {name:'Egypt', colour:''}, 
    'at': {name:'Austria', colour:''}
  }; 
  
  function randomHex()
  {
    var hexs = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    var colour="";
    for (i=0; i<6; i++)
    {
      colour+= hexs[Math.round(Math.random()*14)];
    }
    return '#'+colour;
  }
  
  function drawMap(sCountry, sColor, context) 
    {
        context.fillStyle = sColor;
        context.strokeStyle = sBorderColor;
        context.beginPath();

        // loop through paths
        for (var iPath = 0; iPath < oWorldMap[sCountry].length; iPath++) {
            context.moveTo((oWorldMap[sCountry][iPath][0][0] * iRatio) - iOffsetX, (oWorldMap[sCountry][iPath][0][1] * iRatio) - iOffsetY);
            for (iCoord = 1; iCoord < oWorldMap[sCountry][iPath].length; iCoord++) {
              context.lineTo((oWorldMap[sCountry][iPath][iCoord][0] * iRatio) - iOffsetX, (oWorldMap[sCountry][iPath][iCoord][1] * iRatio) - iOffsetY);
            }
            context.closePath();
            context.fill();

            context.stroke();
        }
    }
  
  
  
  window.onload = function()
  {
    canvasEl = document.getElementById('canvas');
    canvasEl.width = canvasEl.width;
    
    var canvasEl2 = document.getElementById('canvas2');
    
    if(canvasEl.getContext) 
    {
      context = canvasEl.getContext('2d');
      context.lineWidth = 1;
      
      context2 = canvasEl2.getContext('2d');
      context2.lineWidth = 1;
      
      var colour = '';
        for (var sCountry in oWorldMap) 
      {
        colour = randomHex();
        while(countryColours[colour]){  colour = randomHex();}
        countryColours[colour] = sCountry;
        
        if (visitedCountries[sCountry])
        {
          drawMap(sCountry, colour, context);
          visitedCountries[sCountry].colour = colour;
        }
        else
        {
          drawMap(sCountry, sFGColor, context);
        }
        
        drawMap(sCountry, colour, context2);
      }
    }
  }
  
  function mouseMoved(event)
  {
    function getMousePosition(e) 
    {
      var posx = 0;
      var posy = 0;
      if (!e) var e = window.event;
      if (e.pageX || e.pageY)   {
        posx = e.pageX;
        posy = e.pageY;
      }
      else if (e.clientX || e.clientY)  {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      return [posx, posy];
    }
    
    
    var mousePos = getMousePosition(event);
    
    var data = context2.getImageData(mousePos[0], mousePos[1], 1, 1).data;
    var color = '#';
    for (var i=0, hex = ''; i<3; i++)
    {
      hex = data[i].toString(16);
      hex = (hex.length==2) ? hex : '0'+hex;
      color+=hex;
    }
    
    var hoveredCountry = countryColours[color];
    if ((currentColour != color) && (visitedCountries[hoveredCountry] === undefined) )
    {
      canvasEl.width = canvasEl.width;
      
      for (var sCountry in oWorldMap) 
      {
        if (visitedCountries[sCountry])
        {
          drawMap(sCountry, visitedCountries[sCountry].colour, context);
        }
        else
        {
          if (color == '#000000')
          {
            drawMap(sCountry, sFGColor, context);
          }
          else
          {
            if (sCountry == hoveredCountry)
            {
              drawMap(sCountry, color, context);
            }
            else
            {
              drawMap(sCountry, sFGColor, context);
            }
          }
        }
      }
      currentColour=color;    
    }
  }