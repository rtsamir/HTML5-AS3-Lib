/**
 * @author Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */

var graphics;
var mCanvas;
var stage;
var mIntervalId = -1;

function CreateStage (iwidth,iHeight,fps)
{
    var canvasObject = '<canvas id="theStage" name="theStage" width="'+iwidth+'" height="'+iHeight+'" > ' +
            'Your browser does not support canvas.' +
            '</canvas>'
    document.write(canvasObject);
    getCanvasElements("theStage");
   stage  = new DisplayObject.Sprite();
    if(mIntervalId > 0)
        clearInterval(mIntervalId);
    if(fps == null)
        fps = 30;
    mIntervalId = setInterval(gameLoop,1000/fps);
    addEvent('touchstart', touchStart);
    addEvent('touchmove', touchMove);
    addEvent('touchend', touchEnd);
}
//________________________________________________________________

function getCanvasElements(id)
{
    mCanvas  = document.getElementById(id);
    if (mCanvas != null)
        graphics = mCanvas.getContext('2d');
    else
        alert("erroe: HTML 5 canvas problem");
}
//_____________________________________________________________

function gameLoop (ev)
{
    graphics.clearRect(0,0,mCanvas.width,mCanvas.height);
    window.scrollMaxY = 0;
    if(this.onEnterFrame)
        this.onEnterFrame();
    if(stage != null)
        stage.draw();
}
//_____________________________________________________________
function addEvent(eventName, eventHandler)
{
    if (mCanvas.addEventListener){
        mCanvas.addEventListener(eventName, eventHandler, false);
    } else if (mCanvas.attachEvent){
        mCanvas.attachEvent('on'+eventName, eventHandler);
    }
}
//_______________________________________________

function removeEvent(eventName, eventHandler)
{
    if (mCanvas.removeEventListener){
        mCanvas.removeEventListener(eventName, eventHandler, false);
    } else if (mCanvas.detachEvent){
        el.detachEvent('on'+eventName, eventHandler);
    }
}
//__________________________________________________

function touchStart(event)
{
    event.preventDefault();
}
//_______________________________________________________

function touchMove(event)
{
     event.preventDefault();
}
//______________________________________________

function touchEnd(event)
{
    event.preventDefault();
}