/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
var mCanvasElement;
var graphics;
var mCanvas;
var mGameManager
var mIntervalId = -1;
//_____________________________________________________________

function CreateStage (iwidth,iHeight)
{
    var canvasObject = '<canvas id="theStage" name="theStage" width="'+iwidth+'" height="'+iHeight+'" > ' +
            'Your browser does not support canvas.' +
            '</canvas>'
    document.write(canvasObject);
    //alert(canvasObject);
    getCanvasElements("theStage");
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

function init()
{
    mGameManager  = new CGameManager();
    mGameManager.initGame();

    //mCanvas.removeEventListener('touchstart', touchStart);
    //mCanvas.removeEventListener('touchmove', touchMove);
    //mCanvas.removeEventListener('touchend', touchEnd,false);
    //mCanvas.removeEventListener('mousemove', mouseMove, false);
    //mCanvas.removeEventListener('mouseup',   mouseUp, false);
    addEvent('touchstart', touchStart);
    addEvent('touchmove', touchMove);
    addEvent('touchend', touchEnd);
    addEvent('mousemove', mouseMove);
    addEvent('mouseup',   mouseUp);

    if(mIntervalId > 0)
        clearInterval(mIntervalId);
    mIntervalId = setInterval(gameLoop,1000/60);
}
//_______________________________________________

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
//_______________________________________________

function getStaget()
{
    if (mCanvas  && mCanvas .getContext)
    {
        return (mCanvas .getContext('2d'));
    }
    else
        return null;
}
//_______________________________________________________

function gameLoop (ev)
{
    window.scrollMaxY = 0;
    if(mGameManager != null)
        mGameManager.gameLoop();
}
//_______________________________________________________

function mouseUp (ev)
{
    mGameManager.shoot();
}
//_______________________________________________________

function mouseMove (ev)
{
    mGameManager.mouseMove(ev);
}
//_______________________________________________________

function touchStart(event)
{
    event.preventDefault();
}    //_______________________________________________________

function touchMove(event)
{
    var touch = event.touches[0];
    mGameManager.touchMove(touch.pageX, touch.pageY);
    event.preventDefault();
}
//______________________________________________

function touchEnd(event)
{
    mGameManager.touchEnd();
    event.preventDefault();
}
