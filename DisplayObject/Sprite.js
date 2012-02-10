/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
DisplayObject.Sprite=function()
{
    DisplayObject.Shape.call(this);
    this.mChildren=new Array();
    //_____________________________________________________

    this.addChild = function(iShape)
    {
        if(iShape == null)
            return;
        this. mChildren.push(iShape);
         iShape.parent = this;
    }
    //______________________________________________________

    this.removeChild = function(iShape)
    {
        for (i = 0; i < this.mChildren.length; i++)
        {
            if (iShape == this.mChildren[i])
            {
                this.mChildren.splice(i, 1);
                iShape.parent = null;
                return;
            }
        }
    }
}
//__________________________________________________________

DisplayObject.Sprite.prototype =  new DisplayObject.Shape();
//__________________________________________________________

DisplayObject.Sprite.prototype.constructor = DisplayObject.Sparite;
//__________________________________________________________

DisplayObject.Sprite.prototype.draw = function()
{
    graphics.save();
    graphics.translate(this.x, this.y);
    graphics.rotate(this.rotation);
    this.drawShape();
    for(this.i=0; this.i <this. mChildren.length;this.i++  )
    {
       // alert(this.toString() + ".Child [" + this.i + "] = " + this.mChildren[this.i].toString() + " .... " +this. mChildren.length);
        this.mChildren[this.i].draw();
    }
    graphics.restore();
}
//__________________________________________________________
DisplayObject.Sprite.prototype.toString = function()
{
    return("DisplayObject.Sprite");
}

