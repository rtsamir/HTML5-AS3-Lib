/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
DisplayObject.Stage=function (iwidth,iHeight)
{
    document.write('<canvas id="theStage" width="'+iwidth+'" height="'+iwidth+'" > No HTML 5 sapport.</canvas>');
    DisplayObject.Sprite.call(this);
    this.mGravity =-0.1;
    this.x= iX;
    this.y = iY;
    this.mForceX = Math.cos(iAngle) * iForce ;
    this.mForceY = Math.sin(iAngle) * iForce;
}

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




/**
 * Created by JetBrains WebStorm.
 * User: Ronen
 * Date: 25/12/11
 * Time: 09:30
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by JetBrains WebStorm.
 * User: Ronen
 * Date: 27/12/11
 * Time: 12:37
 * To change this template use File | Settings | File Templates.
 */
