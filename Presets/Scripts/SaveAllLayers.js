//SlappysPSDTools v0.1
//Copyright Stan Lindsey
//www.stanlindsey.net
//This Script Saves All Layers without alphas

//Declared Variables
	var docName = app.activeDocument.name
	var docPath = app.activeDocument.path.fullName
	var splitName = docName.split(".")
	var fileName = splitName[0]

	
//Save The Psd Function
function savePsd(){
	activeDocument.save();
}
	
//Check if layer exists
function layerExist(lyrName){ 
      var desc = new ActionDescriptor(); 
      var ref = new ActionReference(); 
      ref.putName( charIDToTypeID( "Lyr " ), lyrName); 
      desc.putReference( charIDToTypeID( "null" ), ref ); 
      desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
      try{
      executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO ); 
      }catch(e){return false;}
      return true;
};

//Save TGAs
function saveFile(suffix){
//Naming our file
var newFileName = docPath.concat( "/", fileName, suffix, ".tga");
//TargaSaveOptions
targaFile = new File( newFileName );
targaSaveOptions = new TargaSaveOptions();
targaSaveOptions.resolution = TargaBitsPerPixels.TWENTYFOUR;
targaSaveOptions.alphaChannels = false;
 //Actually Saving
app.activeDocument.saveAs(targaFile, targaSaveOptions, true, Extension.LOWERCASE);
}

// Hide all layers bar the layer expected to be exported
function hideAllLayers(selectedLayer){
var idShw = charIDToTypeID( "Shw " );
    var desc4 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list1 = new ActionList();
            var ref3 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref3.putEnumerated( idLyr, idOrdn, idTrgt );
        list1.putReference( ref3 );
    desc4.putList( idnull, list1 );
    var idTglO = charIDToTypeID( "TglO" );
    desc4.putBoolean( idTglO, true );
executeAction( idShw, desc4, DialogModes.NO );

	var layerSetRef = app.activeDocument.layerSets.getByName(selectedLayer);
	layerSetRef.visible = 1;
	
	}


//SAVE ALL
// Saving Diffuse
if( layerExist("[Diffuse]")){
	hideAllLayers("[Diffuse]")
    saveFile("_D");
    }
// Saving Spec	
if( layerExist("[Spec]")){
	hideAllLayers("[Spec]")
    saveFile("_S");
    }
	
// Saving Gloss
if( layerExist("[Gloss]")){
	hideAllLayers("[Gloss]")
    saveFile("_G");
    }

// Saving Normals
if( layerExist("[Normals]")){
	hideAllLayers("[Normals]")
    saveFile("_N");
    }
	
	
//Turn all layers back on
	var idShw = charIDToTypeID( "Shw " );
    var desc4 = new ActionDescriptor();
	
    var idnull = charIDToTypeID( "null" );
	
        var list1 = new ActionList();
            var ref3 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
			
            ref3.putEnumerated( idLyr, idOrdn, idTrgt );
        list1.putReference( ref3 );
   
   desc4.putList( idnull, list1 );
    var idTglO = charIDToTypeID( "TglO" );
    desc4.putBoolean( idTglO, true );
executeAction( idShw, desc4, DialogModes.NO );


savePsd();