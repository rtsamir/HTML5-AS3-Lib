/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
var DisplayObject = DisplayObject || {};
DisplayObject.Shape=function()
{
     this.x = 0;
     this.y = 0;
     this.rotation = 0;
    this.parent;
}
//___________________________________________________________________

DisplayObject.Shape.prototype.constructor = DisplayObject.Shape;
DisplayObject.Shape.prototype.draw = function()
{
        graphics.save();
        graphics.translate(this.x, this.y);
        graphics.rotate(this.rotation);
        this.drawShape();
         graphics.restore();
}
//__________________________________________________________
    DisplayObject.Shape.prototype.clone = function(retShape)
    {
        if(retShape == null)
            retShape= new DisplayObject.Shape();
        retShape.x = this.x ;
        retShape.y = this.y ;
        retShape.rotation = this.rotation;
        retShape.draw = this.draw;
        retShape.drawShape = this.drawShape;
             return(retShape)
    }
//  abstract function.
DisplayObject.Shape.prototype.drawShape = function(){}
DisplayObject.Shape.prototype.toString = function()
{
    return("DisplayObject.Shape");
}




