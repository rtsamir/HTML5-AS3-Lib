/**
 * @author Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
BowMan=function ()
{
    DisplayObject.Sprite.call(this);
    var mForce = 0.1;
    var mAngle = 1;
    var mAngleDir = 0.01;
    var mForceDirection = 0.05;

    var mBow = new DisplayObject.Shape();
    this.addChild(mBow );
    mBow.drawShape =  function()
    {
        // Hands
        graphics.beginPath();
        graphics.lineWidth   =5;
        graphics.strokeStyle = '#339933';
        graphics.moveTo(6,0);
        graphics.lineTo(25,0);
        if(mForce > 0)
        {
            graphics.moveTo(0,0);
            graphics.lineTo(8-  mForce * 1.7,8 -mForce/2);
            graphics.lineTo(19 -  mForce,0);
        }
        else
        {
            graphics.moveTo(-2,0);
            graphics.lineTo(-25,-6);
        }
        graphics.stroke();

        // Bow
        graphics.beginPath();
        graphics.lineWidth   =3;
        graphics.strokeStyle = '#663300';
        var aHalfForce = mForce/2;
        graphics.moveTo(19 - aHalfForce,-25);
        graphics. quadraticCurveTo(35 + aHalfForce ,0, 19 - aHalfForce, 25);
        graphics.stroke();
        graphics.closePath();

        //  Bow String
        graphics.beginPath();
        graphics.lineWidth   =1;
        graphics.strokeStyle = '#666666';
        graphics.moveTo(18 - aHalfForce,-25);
        graphics.lineTo(19 -  mForce * 1.7,0);
        graphics.lineTo(18 - aHalfForce,25);
        graphics.stroke();
        graphics.closePath();

        // Arrow
        if(mForce >0)
        {
            graphics.beginPath();
            graphics.lineWidth   =2;
            graphics.strokeStyle =  '#996600';
            graphics.moveTo(19 -  mForce * 1.7,0);
            graphics.lineTo(19 -  mForce * 1.7 + 40,0);
            graphics.stroke();
            graphics.closePath();
        }
    }




    this. setAngle = function(iX,iY)
    {
        mAngle = -Math.atan2(this.x - iX, this.y - iY ) - Math.PI / 2;
    }

    this.drawShape = function()
    {
        // debugText.value = "Force  =  " +Math.round( mForce * 2) + "\nAngle = " +(- Math.round(mAngle * 180 / Math.PI)) ;

        if(mForce > 0)
            mForce+=mForceDirection;
        if(mForce  > 15)
        {
            mForceDirection = -0.09
        }
        if(mForce  <5)
        {
            mForceDirection = 0.09
        }
        mBow.rotation = mAngle;


        graphics.lineJoin= "bevel";
        graphics.lineCap = "round";
        graphics.shadowOffsetX = 4;
        graphics.shadowOffsetY = 4;
        graphics.shadowBlur = 5;
        graphics.shadowColor = "black";


        // Head
        graphics.beginPath();
        graphics.lineWidth   =3;
        graphics.strokeStyle = '#666600';
        graphics.fillStyle = '#ffdd22'
        graphics.arc(0,-14,10,0,Math.PI*2,true);
        graphics.stroke();
        graphics.fill();
        graphics.closePath();

        // Body
        graphics.lineWidth   =10
        graphics.beginPath();
        graphics.strokeStyle = '#22cc22'; // red
        graphics.moveTo(0,0);
        graphics.lineTo(0,20);
        graphics.stroke();
        graphics.closePath();

        // Legs
        graphics.beginPath();
        graphics.strokeStyle = '#339933'; // red
        graphics.moveTo(-10,40);
        graphics.lineTo(0,20);
        graphics.lineTo(10,30);
        graphics.lineTo(5,40);
        graphics.stroke();
        graphics.closePath();

        var gradient =  graphics.createRadialGradient(90,63,30,50,63,90);
        gradient.addColorStop(0, '#FF3300');
        gradient.addColorStop(1, '#bb5500');


        graphics.lineWidth=20;
        graphics.lineJoin= "round";
        graphics.beginPath();
        graphics.strokeStyle =gradient;
        graphics.rect(-40,50,60,20)
        graphics.stroke();
        graphics.closePath();


    }
    //___________________________________________________

    this.addArrow=function ()
    {
        mForce = 5;
    }
    //____________________________________________________

    this.shoot=function ()
    {
        if(mForce == 0)
            return null;
        var aArrow = new Arrow(this.x, this.y, mForce, mAngle);
        mForce = 0;
        setTimeout(this.addArrow,500)
        return(aArrow);
    }
}

BowMan.prototype =  new DisplayObject.Sprite;
BowMan.prototype.constructor = BowMan;




