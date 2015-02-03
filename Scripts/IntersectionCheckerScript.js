#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D(col : Collider2D) {

	if(col.gameObject.transform.parent.tag == "Room")
	{
		transform.parent.GetComponent(RoomScript).intersects = true;	
	}

}