//SlappysPSDTools v0.1
//Copyright Stan Lindsey
//www.stanlindsey.net
//This Script Saves The Selected Layer with correct suffix with an alpha channel


//Declared Variables
	var docName = app.activeDocument.name;
	var docPath = app.activeDocument.path.fullName;
	var splitName = docName.split(".");
	var fileName = splitName[0];
	var activeLayer = app.activeDocument.activeLayer

//Save The Psd Function
function savePsd(){
	activeDocument.save();
}
	
//Save TGAs
function saveFile(suffix){

	var channelRef = app.activeDocument.channels.getByName("AlphaChannel");
	channelRef.visible = 1
	

	//Declared Variables
	var docName = app.activeDocument.name;
	var docPath = app.activeDocument.path.fullName;
	var splitName = docName.split(".");
	var fileName = splitName[0];

	//Naming our file
	var newFileName = docPath.concat( "/", fileName, suffix, ".tga");
	  
	//TargaSaveOptions
	targaFile = new File( newFileName );
	targaSaveOptions = new TargaSaveOptions();
	targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;
	targaSaveOptions.alphaChannels = true;
	 
	//Actually Saving
	app.activeDocument.saveAs(targaFile, targaSaveOptions, true, Extension.LOWERCASE);
}

//HideAllLayersForSave
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




if (activeLayer.name === "[Diffuse]"){

	hideAllLayers("[Diffuse]")
	saveFile("_D");
		
}

else if (activeLayer.name === "[Spec]"){

	hideAllLayers("[Spec]")
	saveFile("_S");
}

else if (activeLayer.name === "[Gloss]"){

	hideAllLayers("[Gloss]")
	saveFile("_G");
}

else if (activeLayer.name === "[Normals]"){

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