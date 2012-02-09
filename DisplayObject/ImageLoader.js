/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
DisplayObject.ImageLoader=function (iSrc)
{
    this.image = new Image();
    this.currentframe = 0;
    this.width = 64;
    this.height = 71;
    this.totalframes = 11;
    this.cols = 3;
    this.saspend = 100;
    this.lastTime = 0;
    this.playOnce = false;
    this.url;
    DisplayObject.Shape.call(this);
    if(iSrc != null)
        this.load(iSrc);
}

DisplayObject.ImageLoader.prototype =  new DisplayObject.Shape()
DisplayObject.ImageLoader.prototype.constructor = DisplayObject.ImageLoader;
DisplayObject.ImageLoader.prototype.load = function (iSrc)
{
    this.image.src = iSrc;
    this.url = iSrc;
    this.image.loader = this;
    this.image.onload = function() {
        this.loader.onLoad();
    }
    //____________________________________________________________
    DisplayObject.ImageLoader.prototype.clone = function()
    {

        var retImageLoader = new DisplayObject.ImageLoader();
       DisplayObject.Shape.prototype.clone.call(this,retImageLoader );
        retImageLoader.image =    this.image;
        retImageLoader.currentframe = this.currentframe;
        retImageLoader.width = this.width;
        retImageLoader.height = this.height;
        retImageLoader.totalframes  =  this.totalframes;
        retImageLoader.cols =  this.cols;
        retImageLoader.saspend = this.saspend;
        retImageLoader.lastTime = this.lastTime;
        retImageLoader.url =  this.url;
        return(retImageLoader)

    }
}

//_________________________________________________________

DisplayObject.ImageLoader.prototype.centerX = function()
{
    return (this.x+this.width / 2);
}
//_________________________________________________________

DisplayObject.ImageLoader.prototype.centerY = function()
{
    return( this.y+ this.height / 2);
}
//_________________________________________________________

DisplayObject.ImageLoader.prototype.setFps = function(iFps)
{
    this.saspend = 1000/ iFps;
}
//_________________________________________________________

DisplayObject.ImageLoader.prototype.onLoad = function()
{
     this.cols = this.image.width / this.width;
}
//_________________________________________________________

DisplayObject.ImageLoader.prototype.drawShape = function()
{
    var d = new Date();
    if(d.getTime() - this.lastTime > this.saspend )
    {
        this.currentframe++;
        if(this.currentframe >= this.totalframes)
        {
            if(this.playOnce)
            {
                this.parent.removeChild(this);
                return;
            }
            this.currentframe = 0;
        }
        this.lastTime = d.getTime();
    }
    var row = this.currentframe % this.cols;
    var col = Math.floor(this.currentframe / this.cols);
    //alert(this.currentframe + " >> " + col + " , " + row)
    graphics.drawImage( this.image, row *this.width, col *  this.height ,this.width,this.height, 0,0,this.width,this.height);

    DisplayObject.ImageLoader.prototype.toString = function()
    {
        return("DisplayObject.ImageLoader");
    }
}
