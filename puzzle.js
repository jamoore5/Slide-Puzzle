var original  = [], images = [], hole=8, blank, temp;

var slide_fx = document.getElementById("slide");
var error_fx = document.getElementById("error");
var win_fx = document.getElementById("win");

/*
 *
 */
function showPicture(image) {
	
    clearPiture()
    
    for (var x = 0; x < 3; ++x) {
		for (var y = 0; y < 3; ++y) {
			var canvas = document.createElement('CANVAS');
			canvas.width = image.width/3;
			canvas.height = image.height/3;
			var context = canvas.getContext('2d');
			context.drawImage(image, y*canvas.width, x*canvas.height, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
			original.push(canvas);
            images = copy(original);
		}
	}
    
    var canvas = document.createElement('CANVAS');
    canvas.width = image.width/3;
    canvas.height = image.height/3;
    var context = canvas.getContext('2d');
    context.fillStyle="#FFFFFF";
    context.fillRect( 0, 0, canvas.width, canvas.height);
    blank = canvas;
   
    for (var x = 0; x < 9; ++x) {
        document.getElementById('img '+x).appendChild(original[x]);
    }
    
    document.getElementById('previewImage').style.display = 'none';
}

function clearPiture(){
    original = [];
    hole = 8;
    for (var x = 0; x < 9; ++x) {
        node = document.getElementById('img '+x);
        if (node.firstChild) node.removeChild(node.firstChild);
    }
}

/*
 *
 */
function copy(array){
    arrayCopy = [];
    for (var i = 0 ; i < array.length; i++){
        arrayCopy.push(array[i]);
    }
    return arrayCopy;
}

/*
 *
 */
function shuffle(array){
    var counter = array.length-1, temp, index;
    while (counter > 0){
        index = Math.floor(Math.random()*counter);
        console.log(index);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

/*
 * Array equals for array of canvas elements
 */
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   

/*
 *
 */
function sufflePuzzle(image){
    image = document.getElementById('previewImage');
    showPicture(image);
    if (original.equals(images)) {
        images = shuffle(images)
        for (var x = 0; x < 9; x++) {
            document.getElementById('img '+x).appendChild(images[x]);
        }
        myNode = document.getElementById('img '+ hole);
        myNode.removeChild(myNode.firstChild);
        myNode.appendChild(blank);
    }
}

/*
 *
 */
function slide(piece){
    if (original.equals(images)) console.log("done");
    else if (hole == piece - 3 || 
             hole == piece + 3 || 
             Math.floor(hole / 3) == Math.floor(piece / 3) &&
             (hole == piece + 1 ||  hole == piece - 1) ){
        myNode = document.getElementById('img '+ hole);
        myNode.removeChild(myNode.firstChild);
        myNode.appendChild(images[piece]);
        document.getElementById('img '+ piece).appendChild(blank);
        temp = images[hole]; 
        images[hole] = images[piece];
        images[piece] = temp;
        hole = piece;
        if (original.equals(images)){
            myNode = document.getElementById('img '+ hole);
            myNode.removeChild(myNode.firstChild);
            myNode.appendChild(images[8]);
            win_fx.play();
        }
        else slide_fx.play();
    }
    else{
        error_fx.play();
    }
}


