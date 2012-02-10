/**
 * @author Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
Arrow=function (iX,iY,iForce,iAngle)
{
    DisplayObject.Shape.call(this);
    this.mGravity =-0.1;
    this.x= iX;
    this.y = iY;
    this.mForceX = Math.cos(iAngle) * iForce;
    this.mForceY = Math.sin(iAngle) * iForce;
}
Arrow.ArrowsList = new Array();
Arrow.prototype =  new DisplayObject.Shape()
Arrow.prototype.constructor = Arrow
Arrow.prototype.drawShape = function()
{
    this. mForceY -= this.mGravity;
    this.x+=this. mForceX;
    this.y+= this.mForceY;

    if((this.x < -100)||(this.x > 800)||(this.y < -100)||(this.y > 1000))
    {
        if(this.parent != null)
            this.parent.removeChild(this);
        for(var a = 0; a <  Arrow.ArrowsList.length; a++)
        {

            if(Arrow.ArrowsList[a] == this )
            {
                Arrow.ArrowsList.splice(a,1);
                return;
            }
        }
    }

    this.rotation = Math.atan2(this.mForceY, this.mForceX)

    graphics.beginPath();
    graphics.lineWidth =2;
    graphics.strokeStyle =  '#996600';
    graphics.moveTo(-20,0);
    graphics.lineTo(20,0);
    graphics.stroke();
    graphics.closePath();

}