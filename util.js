/*
This file is include the functions which are used
to calculate the area of shapes, round the number
and calculate the medium value etc...

*/

var circleAreaArr = [], squareAreaArr = [], rectangleAreaArr = [], ellipseAreaArr = [];

function getAreaofSelectedShape() {

    var selectedShap = $("#strShape").val();
    var calculatedArea;

    $("#lbl1, #lbl2, #lbl3, #lbl4, #lblResult, #btnSubmit").hide();

    if(selectedShap == "Circle"){

        getDistanceAPI(function (nRadius){

          $("#lbl1,#lblResult").show();        
          $("#lbl1").html("Radius of circle (r) : "+nRadius.distance);
          calculatedArea = roundToTwoDecimals(Math.PI * Math.pow(nRadius.distance, 2));
          $("#lblResult").html("Area of circle = ( &Pi;r<sup>2</sup> ) = " + calculatedArea);                
          areaCounter(1);
          $("#circleArea").html(calculatedArea);
          circleAreaArr.push(calculatedArea);
          $("#circleMedVal").html((getMediumValue(circleAreaArr))); 

        });

    }else if(selectedShap == "Square"){

        getDistanceAPI(function (nLength){

          $("#lbl1,#lblResult").show();        
          $("#lbl1").html("Length of a side of square (L) : "+nLength.distance);        
          calculatedArea = Math.pow(nLength.distance, 2);
          $("#lblResult").html("Area of square = ( L x L = L<sup>2</sup> ) = " + calculatedArea);
          areaCounter(2);
          $("#squareArea").html(calculatedArea);
          squareAreaArr.push(calculatedArea);
          $("#squareMedVal").html(getMediumValue(squareAreaArr));

        });

    }else if(selectedShap == "Rectangle"){

        getDistanceAPI(function (widthofRectangel){
          getDistanceAPI(function (heightofRectangel){

            $("#lbl1, #lbl2,#lblResult").show();        
            $("#lbl1").html("Width of rectangle  (w) : "+widthofRectangel.distance);
            $("#lbl2").html("<br>Height of rectangle (h) : "+heightofRectangel.distance);
            calculatedArea = widthofRectangel.distance * heightofRectangel.distance;
            $("#lblResult").html("Area of rectangle = ( w x h ) = " + calculatedArea);
            areaCounter(3);
            $("#rectangleArea").html(calculatedArea);
            rectangleAreaArr.push(calculatedArea);
            $("#rectangleMedVal").html(getMediumValue(rectangleAreaArr));

          });      
        });

    }else if(selectedShap == "Ellipse"){

        getDistanceAPI(function (nLength1){
          getDistanceAPI(function (nLength2){
            
            if(nLength1.distance >= nLength2.distance){
              var lengthofMajorAxis = nLength1.distance;
              var lengthofMinorAxis = nLength2.distance;
            }else{
              var lengthofMajorAxis = nLength2.distance;
              var lengthofMinorAxis = nLength1.distance;
            }

            $("#lbl1, #lbl2,#lblResult").show();        
            $("#lbl1").html("Length of semi-major axis (a) : "+lengthofMajorAxis);
            $("#lbl2").html("<br>Length of semi-minor axis (b) : "+lengthofMinorAxis);
            calculatedArea = roundToTwoDecimals(Math.PI * (lengthofMajorAxis * lengthofMinorAxis));
            $("#lblResult").html("Area of ellipse = ( &Pi;ab ) = " +  calculatedArea);
            areaCounter(4);
            $("#ellipseArea").html(calculatedArea);          
            ellipseAreaArr.push(calculatedArea);
            $("#ellipseMedVal").html(roundToTwoDecimals(getMediumValue(ellipseAreaArr))); 

          });      
        });    

    }

} 


var addInAreaCounter = (function (n) {
  var counter1 = 0;
  var counter2 = 0;
  var counter3 = 0;
  var counter4 = 0;
  return function (n) {
             if(n==1)
               return counter1 += 1;
             if(n==2)
               return counter2 += 1;
             if(n==3)
               return counter3 += 1;
             if(n==4)
               return counter4 += 1;
         }
  })();

  function areaCounter(n){
     if(n==1)
        $("#count1").html(addInAreaCounter(n));
     if(n==2)
        $("#count2").html(addInAreaCounter(n));
     if(n==3)
        $("#count3").html(addInAreaCounter(n));
     if(n==4)
        $("#count4").html(addInAreaCounter(n));
  }

  function roundToTwoDecimals(decimalVal, decimals) {
      return Number(decimalVal.toFixed(2));
  }


function getMediumValue(areaArr) {
    areaArr.sort(function(a,b) {return a - b;});
    var medVal = Math.floor(areaArr.length/2);
    if(areaArr.length % 2)
        return areaArr[medVal];
    else
        return (areaArr[medVal-1] + areaArr[medVal]) / 2.0;
}