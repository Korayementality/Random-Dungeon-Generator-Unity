#pragma strict


public class Center {

	var x : float;
	var y : float;
	var object : GameObject;
};


var width : int;
var height : int;
var minDimension : int;
var maxDimension : int;
var floor : GameObject;
var intersects : boolean = false;
var Generator : GameObject;
var center = new Center();
var roomIndex : int;
var nextRoom : GameObject;

function Start () {

	Generator = GameObject.Find("MapGenerator");
	RandomizeDimensions();
	CreateTiles();
	CalculateCenter();

}

function Update () {

	if(intersects)
	{	
		
		Generator.GetComponent(MapGenerationScript).GenerateRooms(1);
		Generator.GetComponent(MapGenerationScript).roomCount--;
		Destroy(gameObject,0);
		
	}

}

function CreateTiles() {

	for (var i = 0; i < height; i++) 
	{
	
		for (var j = 0; j < width; j++) 
		{
			var floor = Instantiate(floor, Vector2(transform.position.x+j, transform.position.y+i), transform.rotation);
			floor.transform.parent = transform;
			floor.GetComponent(SpriteRenderer).sortingOrder = 1;
		}

	}

}

function RandomizeDimensions() {
	width = Random.Range(minDimension, maxDimension);
	height = Random.Range(minDimension, maxDimension);
}

function CalculateCenter() {

	center.x = transform.position.x + width/2;
	center.y = transform.position.y + height/2;
	for(var i = 0; i < transform.childCount; i++)
	{
		if(transform.GetChild(i).position.x == center.x && transform.GetChild(i).position.y == center.y)
		{
			center.object = transform.GetChild(i).gameObject;
			
		}
	}
	
}