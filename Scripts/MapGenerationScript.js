#pragma strict

var size : int;
var wall : GameObject;
var wallChild : GameObject;
var floor : GameObject;
var room : GameObject;
var numberOfRooms : int;
var roomCount : int;
var generating : boolean; //Tells if the script is still in the process of generating and placing rooms
var done : boolean; //Tells if the PCG is done as a whole or not

var roomArray : GameObject[];


function Start () {
	
	GenerateWalls(size);

}

function Update () {

	if(roomCount < numberOfRooms)
	{
		generating = true;
		GenerateRooms(1);	
	}
	else
	{
		generating = false;
		if(!generating && !done)
		{
			done = true;
			RoomCollection();
		}
	}
	
	
}


function GenerateWalls(s : int) {
	
	Debug.Log("Generating Walls");
	
	for(var i = 0; i < s; i++)
	{
		for(var j = 0; j < s; j++)
		{
			wallChild = Instantiate(wall, Vector3(j, i, 0), transform.rotation);
			wallChild.transform.parent = transform;
		}
	}
}

function GenerateRooms(n : int) {
	
	Debug.Log("Generating Rooms");
	
	var xpos : int;
	var ypos : int;
	var j = 0;
	while(j <= n && roomCount < numberOfRooms)
	{
		xpos = Random.Range(0.2*size, size - ( 0.2 * size ) );
		ypos = Random.Range(0.2*size, size - ( 0.2 * size ) );
		Instantiate(room, Vector2(transform.position.x+xpos, transform.position.y+ypos), transform.rotation);
		roomCount++;
		j++;
	}

}

function GenerateCorridors() {
	var i = 0; //room reference
	var j : int; // corridor x reference
	var k; // corridor y reference
	var floorChild : GameObject;
	var x1 : int = roomArray[i].GetComponent(RoomScript).center.x;
	var y1 : int = roomArray[i].GetComponent(RoomScript).center.y;
	var x2 : int = roomArray[i+1].GetComponent(RoomScript).center.x;
	var y2 : int = roomArray[i+1].GetComponent(RoomScript).center.y;
	var HVRoll : int = Random.Range(0,100); // Roll the function to decide if a corridor is created horizontally or vertically first
	Debug.Log("Placing Corridors");
	for(i = 0; i <= roomCount; i++)
	{
		x1 = roomArray[i].GetComponent(RoomScript).center.x;
		y1 = roomArray[i].GetComponent(RoomScript).center.y;
		x2 = roomArray[i+1].GetComponent(RoomScript).center.x;
		y2 = roomArray[i+1].GetComponent(RoomScript).center.y;
		//Horizontal
		//if(HVRoll > 50)
		//{
			if(x1 < x2)
			{
				for(j = x1; j <= x2; j++)
				{
					floorChild = Instantiate(floor, Vector3(j, y1, 0), transform.rotation);
					floorChild.transform.parent = transform;
				}
			}
			else
			{
				for(j = x1; j >= x2; j--)
				{
					floorChild = Instantiate(floor, Vector3(j, y1, 0), transform.rotation);
					floorChild.transform.parent = transform;
				}
			}
			if(y1 < y2)
			{
				for(j = y1; j <= y2; j++)
				{
					floorChild = Instantiate(floor, Vector3(x2, j, 0), transform.rotation);
					floorChild.transform.parent = transform;
				}
			}
			else
			{
				for(j = y1; j >= y2; j--)
				{
					floorChild = Instantiate(floor, Vector3(x2, j, 0), transform.rotation);	
					floorChild.transform.parent = transform;
				}
			}
		//}
	}
	
}

function RoomCollection() {
	
	Debug.Log("Collecting Rooms");
	roomArray = GameObject.FindGameObjectsWithTag("Room");
	
	for(var i = 0; i < numberOfRooms-1; i++)
	{
		roomArray[i].GetComponent(RoomScript).roomIndex = i;
		if(i < roomArray.length)
		{
			roomArray[i].GetComponent(RoomScript).nextRoom = roomArray[i+1];
		}
	}
	GenerateCorridors();
	
}